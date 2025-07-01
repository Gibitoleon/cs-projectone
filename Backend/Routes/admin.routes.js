const express = require("express");
const router = express.Router();
const { authMiddleware, adminOnly } = require("../Middleware/Verification.guard");
const itemController = require("../Controllers/item.controller");
const claimController = require("../Controllers/claim.controller");
const disputeController = require("../Controllers/dispute.controller");
const userController = require("../Controllers/user.controller");

// Found Items
router.get("/items", authMiddleware, adminOnly, itemController.getAllItems);
router.put("/items/:id/approve", authMiddleware, adminOnly, itemController.approveItem);
router.put("/items/:id/reject", authMiddleware, adminOnly, itemController.rejectItem);

// Claims
router.get("/claims", authMiddleware, adminOnly, claimController.getAllClaims);
router.put("/claims/:id/approve", authMiddleware, adminOnly, claimController.approveClaim);
router.put("/claims/:id/reject", authMiddleware, adminOnly, claimController.rejectClaim);
router.put("/claims/:id/escalate", authMiddleware, adminOnly, claimController.escalateClaim);

// Disputes
router.get("/disputes", authMiddleware, adminOnly, disputeController.getAllDisputes);
router.put("/disputes/:id/resolve", authMiddleware, adminOnly, disputeController.resolveDispute);

// Users
router.get("/users", authMiddleware, adminOnly, userController.getAllUsers);
router.put("/users/:id/block", authMiddleware, adminOnly, userController.blockUser);

// Dashboard stats
router.get("/stats", authMiddleware, adminOnly, async (req, res) => {
  // Implement logic to return stats: items, claims, disputes, users
  // Example:
  // const items = await Item.countDocuments();
  // ...
  res.json({ items: 0, claims: 0, disputes: 0, users: 0 });
});

module.exports = router;
