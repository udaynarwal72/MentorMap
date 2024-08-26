import mongoose, { mongo } from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;
import { genSalt, hash, compare } from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const UserSchema = new Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: Number, required: true },
    avatar: { type: String, required: true },
    username: { type: String, required: true },
    interest: { type: String, required: true },
    user_role: { type: String, required: true },
    company: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

export default User;