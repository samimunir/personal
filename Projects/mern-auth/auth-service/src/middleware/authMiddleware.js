import jwt from "jsonwebtoken";

function requireAuth(req, res, next) {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload; // { sub, role, tokenVersion }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
}

export default requireAuth;
