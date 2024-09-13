import express from 'express';
import "dotenv/config";
import { connectDB } from './db/connectDB.js';
import authRoutes from "./routes/auth.route.js";


const app = express();
const PORT = process.env.PORT || 5010;

app.use(express.json()); // allows us to parse incoming requests : req.body

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port : ${PORT}`);
});