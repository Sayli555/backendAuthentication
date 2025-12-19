const { verifyAccessToken } = require("../helper/haspassword.helper");

exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = verifyAccessToken(token);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error.message === "Invalid access token") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    return res.status(401).json({ message: "Unauthorized" });
  }
};
