const { StatusCodes } = require("http-status-codes");
const Notification = require("../Model/notification.model");
class NotificationController {
  async GetAllNotifications(req, res) {
    const currentuserid = req.user;
    const allnotifications = await Notification.find({ to: currentuserid });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Get all Notifications", data: allnotifications });
  }

  async MarkNotificationAsRead(req, res) {
    const { notificationid } = req.params;
    await Notification.findByIdAndUpdate(notificationid, {
      read: true,
    });
    return res.status(StatusCodes.OK).json({ msg: "updated" });
  }

  async CreateNotification(req, res) {
    const currentuserid = req.user;
    const { itemid, itemname, usertosend, message } = req.body;
    const notification = await Notification.create({
      from: currentuserid,
      to: usertosend,
      message,
      item: itemid,
    });
    res.status(StatusCodes.CREATED).json({ msg: "created notification" });
  }
}

module.exports = new NotificationController();
