/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { json } from "body-parser";
import mongoose from "mongoose";

import { choresRouter } from "../chores/chores.router";
import { errorHandler } from "../middleware/error.middleware";
import { notFoundHandler } from "../middleware/not-found.middleware";
import connectDB from "./db";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/chores/items", choresRouter);
// app.use("/api/auth", require("./auth"));
// app.use("/api/private", require("./private"));

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
