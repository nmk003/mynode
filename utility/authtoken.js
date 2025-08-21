import jwt from "jsonwebtoken";

const Authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    } else {
      await jwt.verify(authorization, process.env.JWT_SECRET);
      next();
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default Authentication;
