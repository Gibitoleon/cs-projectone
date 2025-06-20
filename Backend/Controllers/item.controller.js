const User = require("../Model/user.model"); //importing the user model
const MediaService = require("../Services/Media/Media.js"); //importing the media service for handling image uploads

const Item = require("../Model/item.model");
const Notification = require("../Model/notification.model.js");

const { StatusCodes } = require("http-status-codes");
const Fetchapi = require("../Utils/Axios.js"); //importing the fetch api utility for making external requests

class ItemController {
  async UploadFoundItem(req, res) {
    const currentuserid = req.user; //get the user id from the request object
    const { ItemName, Category, Description, Imageurl, Locationfound } =
      req.body; //get the item details from the body
    const user = await User.findById(currentuserid); //check if the user exists and select the id field
    const itemtosave = {
      ItemName,
      Category,
      Description,
      Imageurl,
      Locationfound,
      Foundby: user._id, //set the user id to the item
    };
    const itemcreated = await Item.CreateItem(itemtosave); //create the item using the user model
    // send a notification to the Admin for Item approval
    const Admins = await User.FindAdmin();
    const notifications = Admins.map((Admin) => ({
      to: Admin._id,
      type: "item",
      message: `A new item "${ItemName}" was uploaded by ${user.Firstname} and awaits approval.`,
      item: itemcreated._id,
      from: null,
    }));
    // send the notifications to admin
    await Notification.insertMany(notifications);

    console.log(itemcreated); //log the created item
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Item uploaded awaiting approval" });
  }

  async GetAllFounderItems(req, res) {
    const { Status } = req.query;
    const currentuserid = req.user;
    const FounderItems = await Item.find({ Foundby: currentuserid, Status });

    return res
      .status(StatusCodes.OK)
      .json({ message: "my uploaded Items", data: FounderItems });
  }

  async ApproveUploadedItem(req, res) {
    const currentAdminuser = req.user._id;
    const { Itemid } = req.params; //get the item id from the request parameters
    const { Status } = req.body; //get the status from the body

    const item = await Item.findIdAndUpdate(Itemid, {
      Status,
      ReviewedBy: currentAdminuser,
      ReviewedAt: new Date(),
    }); //update the item with the new status and approved by user

    if (item.Status !== "approved") {
      // Send a notification to the user who uploaded the item the reason for rejection and next course of action
      const notification = await Notification.create({
        to: item.Foundby,
        message: `Your item ${item.ItemName} was rejected. Please follow up with our office`,
      });
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Item not approved" });
    }

    //upload the image to cloudinary and get the image url
    const Imageurl = await MediaService.uploadImage(item.Imageurl);

    //Send the image url to the python microservice for vectorization
    const { vector } = await Fetchapi.Fetch("/vectorize", "POST", { Imageurl });
    console.log(Imageurl, data); //log the response from the python microservice

    //update the item with the image url and vector data
    await Item.findIdAndUpdate(Itemid, {
      Imageurl,
      VectorData: vector, //assuming the python service returns vector data
    });

    // send a notification to the client that the item has been approved
    const notification = await Notification.create({
      from: currentAdminuser._id,
      to: item.Foundby,
      message: `Your item ${item.ItemName} was successfully uploaded`,
    });
    return res
      .status(200)
      .json({ message: "Approve Uploaded Item endpoint hit" });
  }

  async SearchFoundItem(req, res) {
    const { ItemName, Category, Description } = req.query;
    let queryObject = {};
    if (Category) {
      queryObject.Category = Category;
    }
    if (ItemName) {
      const { vector } = await Fetchapi.TextVectorFetch(ItemName);
      const matchingItems = await Item.searchVector(vector);
      return res.status(StatusCodes.OK).json({
        message: "Search by ItemName",
        data: matchingItems,
      });
    }

    // Vector search by Description
    if (Description) {
      const { vector } = await Fetchapi.TextVectorFetch(Description);
      const matchingItems = await Item.vectorSearch(vector, 10);
      return res.status(200).json({
        message: "Search by Description",
        data: matchingItems,
      });
    }

    const items = await Item.find({
      ...queryObject,
      isVerificationQuestionSet: true,
      Status: `approved`,
    })
      .select("ItemName Category Imageurl Locationfound createdAt")
      .sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({ msg: "found items", data: items });
  }

  async AdminGetAllItems(req, res) {
    const { isEscalated, Status } = req.query;
    let queryObject = {};
    if (isEscalated === "true") {
      queryObject.isEscalated = true;
    }
    if (Status) {
      queryObject.Status = Status;
    }
    const escalatedItems = await Item.find(queryObject);
    return escalatedItems;
  }
}

module.exports = new ItemController();
