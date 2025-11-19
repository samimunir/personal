import User from "../models/User.js";
import JWT from "../utils/jwt.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const err = new Error("Authentication required.");
      err.status = 401;

      throw err;
    }

    const token = authHeader.split(" ")[1];
    const payload = JWT.verifyAccessToken(token);

    const user = await User.findById(payload.sub);

    if (!user || !user.isActive) {
      const err = new Error("User not found or inactive.");
      err.status = 401;

      throw err;
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      roles: user.roles,
      profile: user.profile,
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      err.status = 401;
      err.message = "Access token expired.";
    } else if (err.name === "JsonWebTokenError") {
      err.status = 401;
      err.message = "Invalid access token.";
    }

    next(err);
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      const err = new Error("Authenication required.");
      err.status = 401;

      return next(err);
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      const err = new Error("Forbidden - insufficient permissions.");
      err.status = 403;

      return next(err);
    }

    next();
  };
};

export { authenticate, authorizeRoles };
