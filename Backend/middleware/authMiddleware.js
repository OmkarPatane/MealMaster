import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
