import { Router } from "express";
import userController from "../controllers/user.js";
import { userValidator } from "../middlewares/validation/user.js";
import { upload } from "../middlewares/multer.js";

const userRoter = Router();

userRoter
  .post("/register",upload.none(),userValidator, userController.registerUser)
  .post("/login", upload.none(),userController.login);


export { userRoter };
