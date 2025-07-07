const { StatusCodes } = require("http-status-codes");
const Item = require("../Model/item.model");
const User = require("../Model/user.model");

class AnalyticsController {
  async GetAnalytics(req, res) {
    const [TotalItems, ReturnedItems, PendingItems, RejectedItems, TotalUsers] =
      await Promise.all([
        Item.countDocuments(),
        Item.countDocuments({ Isreturned: true }),
        Item.countDocuments({ Status: "pending" }),
        Item.countDocuments({ Status: "rejected" }),
        User.countDocuments(),
      ]);
    const analyticsData = {
      TotalItems,
      ReturnedItems,
      PendingItems,
      RejectedItems,
      TotalUsers,
    };
    return res
      .status(StatusCodes.OK)
      .json({ message: "Get analytics", data: analyticsData });
  }
}

module.exports = new AnalyticsController();
