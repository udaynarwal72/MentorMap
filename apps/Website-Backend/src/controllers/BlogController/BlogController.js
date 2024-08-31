import Blog from "../../schema/BlogSchema.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("createdBy", "username avatar");
        res.status(200).json(new ApiResponse(200, blogs, "All blogs fetched successfully"));
    } catch (error) {
        console.error("Error finding blogs:", error);
        res.status(500).send({ error: "An error occurred while fetching the blogs" });
    }
}
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy", "username avatar");
        if (!blog) {
            return res.status(404).json(new ApiResponse(404, null, "Blog not found"));
        }
        res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
    } catch (error) {
        console.error("Error finding blog by ID:", error);
        res.status(500).send({ error: "An error occurred while fetching the blog" });
    }
};

const postBlog = async (req, res) => {
    const { title, description } = req.body;
    const createdBy = req.user._id;
    try {
        const blog = new Blog({ title, description, createdBy });
        await blog.save();
        res.status(201).json(new ApiResponse(200, blog, "Blog created successfully"));
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).send({ error: "An error occurred while creating the blog" });
    }
}

export {
    getAllBlogs,
    postBlog,
    getBlogById
}