import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: true }
});
const PostModel = mongoose.model("posts", postSchema);

export { PostModel };
