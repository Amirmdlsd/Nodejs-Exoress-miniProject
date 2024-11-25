import { Router } from "express";
import postController from "../controllers/post.js";
import { postValidator } from "../middlewares/validation/postValidation.js";
import { upload } from "../middlewares/multer.js";

const postRouter = Router();

postRouter.get("/posts", postController.getAllPosts);
postRouter.post("/posts",upload.single("image"),postValidator,postController.createPost);



export { postRouter };
