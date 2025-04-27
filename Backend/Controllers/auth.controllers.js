//importing the email validator class
const Validator = require("../Services/Validation/Validator");
const User = require("../Model/user.model");
const Mail = require("../Services/Mail/Mail");
const { StatusCodes } = require("http-status-codes");
const { UserError } = require("../Errors/errors");
const { AuthError } = require("../Errors/errors");
const Jwtgenerator = require("../Utils/Jwt.generator");

class AuthController {
  // Logic for login
  async Login(req, res) {
    const { Email, Password } = req.body; //get the email and password from the body
    const user = await User.findByEmail(Email); //find the user by email

    const isPasswordCorrect = user && (await user.comparePassword(Password)); //compare the password with the hashed password
    if (!user || !isPasswordCorrect) {
      throw new AuthError("Invalid credentials"); //if the user is not found or the password is incorrect, throw an error
    }
    //generate a jwt token and send it to the user
    const userid = user._id.toString(); //get the user id
    Jwtgenerator.generateCookie(res, userid);
    return res.status(200).json({ message: "Login successful" });
  }

  // Logic for signup
  async StartSignup(req, res) {
    const { Email, Password, PasswordConfirmation } = req.body;

    await Validator.ValidateSignup({ Email, Password, PasswordConfirmation }); //validation logic
    const user = await User.CreateUser(Email, Password); //creating a new user

    //generate a verification code and  link  send it to user email
    const verificationCode = await user.generateVerificationCode();
    user.verificationCode = verificationCode; //set the verification code to the user
    const expiryTime = user.generateVerificationCodeExpiry();
    console.log(
      expiryTime.toLocaleString("en-KE", { timezone: "Africa/Nairobi" })
    );

    await user.save(); //save the user to the database
    const verificationLink = `http://localhost:${process.env.Port}/api/v1/auth/verification/${verificationCode}`; //

    //send the email to the user
    await Mail.sendMail(
      user.Email,
      "Verification Code",
      { verificationLink },
      "verification"
    );
    return res
      .status(StatusCodes.OK)
      .json({ message: "Registration successful", email: user.Email });
  }

  // Logic for verification
  async Verification(req, res) {
    const { Email } = req.body; //get the email from the body

    //find the user by email
    const user = await User.findByEmail(Email);
    if (!user) {
      throw new UserError("User not found"); //if user is not found, throw an error
    }
    //check if the verification code is valid
    const { verificationcode } = req.params; //get the verification code from the params
    console.log(verificationcode);
    await user.updateisEmailVerified(verificationcode);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Verification successful" });
  }

  // Logic for collecting profile information
  async CollectProfileInfo(req, res) {
    const signingUser = req.user; //get the user from the request object
    const { Firstname, Surname, Phonenumber } = req.body; //get the profile info from the body

    await Validator.RemainingValidation({ Firstname, Surname, Phonenumber }); //validation logic

    //validating the second stage of signup after email verification

    signingUser.Firstname = Firstname;
    signingUser.Surname = Surname;
    signingUser.Phonenumber = Phonenumber;
    await signingUser.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Collect Profile Info successful" });
  }

  // Logic for completing signup
  async CompleteSignup(req, res) {
    const signingUser = req.user;
    const { Role } = req.body;
    await signingUser.updateRole(Role);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Complete Signup successful" });
  }

  // Logic for logout
  async Logout(req, res) {
    Jwtgenerator.clearCookie(res); //clear the cookie
    return res.status(200).json({ message: "Logout successful" });
  }
}

module.exports = new AuthController();
