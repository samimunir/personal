// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

export const health = async (_req, res) => {
  return res.status(200).json({ service: "AUTH", ok: true });
};
