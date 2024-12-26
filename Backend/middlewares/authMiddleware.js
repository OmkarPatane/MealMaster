import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

 const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

export default authMiddleware
