import express from 'express';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import cors from "cors";
// 배포 환경
import path from "path";

import { connectDB } from './db/connectDB.js';
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5010;
// 배포 환경
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true, }));

app.use(express.json()); // allows us to parse incoming requests : req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

// 배포 환경
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port : ${PORT}`);
});