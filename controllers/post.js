import { PostModel } from "../models/post.js";

async function getAllPosts(req, res) {
  const posts = await PostModel.find();
  res.json({
    posts: posts
  });
}
async function createPost(req, res) {
  const title = req.body.title;
  const body = req.body.body;
  const image = req.file.path;

  const newPost = await PostModel({
    title,
    body,
    image
  });

  const result = await newPost.save();
  return res.status(201).json({
    message: "پست ایجاد شد",
    post: result
  });
}

export default { getAllPosts, createPost };
