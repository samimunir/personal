export function requireRole(...roles) {
  return (req, res, next) => {
    const userRoles = req.user?.roles || [];

    const ok = roles.some((r) => userRoles.includes(r));

    if (!ok) {
      return res.status(403).json({ error: "forbidden" });
    }

    next();
  };
}

// services/gateway/src/middlewares/rbac.js
export function requireRole(role) {
  return (req, res, next) => {
    const roles = (req.user && req.user.roles) || [];
    if (!roles.includes(role))
      return res.status(403).json({ error: "forbidden" });
    next();
  };
}
