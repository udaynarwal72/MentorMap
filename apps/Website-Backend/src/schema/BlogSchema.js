import mongoose, { Schema, mongo } from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;
import { genSalt, hash, compare } from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref:"User", required: true },
});


const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;