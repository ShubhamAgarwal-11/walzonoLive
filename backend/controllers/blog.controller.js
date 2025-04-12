const Blog = require("../models/blog.model");
const {uploadOnCloudinary} = require('../config/cloudinary');

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            success: true,
            blogs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json({
            success: true,
            blog,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { title, description, tag, content } = req.body;
        // console.log(req.body);
        if(!title || !description  || !tag || !content) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const imagePath = req?.files?.image[0]?.path;

        if (!imagePath) {
            return res.status(400).json({
                success: false,
                message: "Blog image is required."
            });
        }

        const uploadedImage = await uploadOnCloudinary(imagePath);
        if (!uploadedImage) {
            return res.status(400).json({
                success: false,
                message: "Error while uploading image on cloudinary."
            });
        }
        const blog = await Blog.create({
            title,
            description,
            image : uploadedImage.url,
            tag,
            content,
            date: new Date().toISOString().split('T')[0],
        });
        res.status(201).json({
            success: true,
            blog,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};