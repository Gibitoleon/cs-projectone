const express = require("express");
const router = express.Router(); //for creating routes
const AuthController = require("../Controllers/auth.controller"); //importing the controller functions
const VerificationGuard = require("../Middleware/Verification.guard"); //importing the email verification guard

//AUTHENTICATION ROUTES

router.post("/login", AuthController.Login); //login route
router.post("/startsignup", AuthController.StartSignup); //start signup route
router.post(
  "/collectprofileinfo",
  VerificationGuard.emailVerifyGuard,
  AuthController.CollectProfileInfo
); //collect profile info route
router.post(
  "/completesignup",
  VerificationGuard.emailVerifyGuard,
  AuthController.CompleteSignup
); //complete signup route

router.post("/verification/:verificationcode", AuthController.Verification); //verification route
router.post("/logout", AuthController.Logout); //loGout route

router.patch("/updateprofile", AuthController.UpdateProfile);
router.patch("/updateprofileImage", AuthController.UpdateProfileImage);

module.exports = router;
