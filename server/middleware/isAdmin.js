export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Access denied" });
  }
  next();
};
