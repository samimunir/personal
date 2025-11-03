import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pino from "pino-http";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
app.use(pino());

app.get("/health", (req, res, next) => {
  console.log("health ok");
  return res.status(200).json({ ok: true });
});

const JWT_SECRET = process.env.JWT_SECRET!;

type JwtClaims = { sub: string; roles: string[] };

app.get("/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const claims = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    }) as JwtClaims;

    return res.json({ userId: claims.sub, roles: claims.roles });
  } catch {
    return res.status(401).json({ error: "unauthorized" });
  }
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT || 5000, () =>
  console.log(`api/gateway live on localhost:${PORT}`)
);
