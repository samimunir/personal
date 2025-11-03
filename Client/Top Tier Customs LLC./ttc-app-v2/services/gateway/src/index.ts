import express from "express";
import cors from "cors";
import pino from "pino-http";
import jwt from "jsonwebtoken";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(pino());

const JWT_PUBLIC = process.env.JWT_PUBLIC?.replace(/\n/g, "\n");

export type JwtClaims = { sub: string; roles: string[] };

const verify = (token?: string) => {
  if (!token || !JWT_PUBLIC) {
    return null;
  }

  try {
    return jwt.verify(token, JWT_PUBLIC) as JwtClaims;
  } catch {
    return null;
  }
};

app.get("/health", (_req, res) => {
  console.log("health ok");
  res.json({ ok: true });
});

app.get("/me", (req, res) => {
  const auth = req.headers.authorization?.split(" ")[1];

  const claims = verify(auth);
  if (!claims) {
    return res.status(401).json({ error: "unauthorized" });
  }

  res.json({ userId: claims.sub, roles: claims.roles });
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`api/gateway live on localhost:5000`)
);
