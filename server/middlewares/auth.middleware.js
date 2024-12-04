// Middleware for route protection
export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    console.log('401 hit')
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }
};