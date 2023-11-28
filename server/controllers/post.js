import CryptoJS from "crypto-js";
import Post from "../models/Post.js";

export const AddPost = async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();

    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(savedPost),
      process.env.PASS
    ).toString();
    res.status(200).json(ciphertext);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(post),
      process.env.PASS
    ).toString();
    res.status(200).json(ciphertext);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allPosts = await Post.find();
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(allPosts),
      process.env.PASS
    ).toString();

    res.status(200).json(ciphertext);
  } catch (error) {
    res.status(500).json(error);
  }
};
