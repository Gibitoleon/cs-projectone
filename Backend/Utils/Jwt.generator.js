const jwt = require("jsonwebtoken");
class Jwtgenerator {
  static generateToken(userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });
    return token;
  }
  static generateCookie(res, userId) {
    const token = this.generateToken(userId); // Generate the JWT token
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      samesite: "Strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // Cookie expiration time (2 days)
    });
  }
  static clearCookie(res) {
    res.cookie("token", "", { maxAge: 0 }); // Clear the cookie by setting its maxAge to 0
  }
}
module.exports = Jwtgenerator; // Export the class for use in other files
