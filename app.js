import express from "express";
import mongoose from "mongoose";
import { postRouter } from "./router/post.js";
import bodyParser from "body-parser";
import { userRoter } from "./router/user.js";

const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Route declarations
app.use("/api", postRouter);
app.use("/auth", userRoter);

// Database connection and server start
mongoose
  .connect("mongodb://127.0.0.1:27017/express_restApi")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
