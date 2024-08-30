import mongoose, { mongo } from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;
import { genSalt, hash, compare } from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    userdocument1: { type: String, required: false },
    userdocument2: { type: String, required: false },
    userIsVerified: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    phone_number: { type: Number, required: true },
    interest: [{ type: String, required: true }],
    skills: [{ type: String, required: false }],
    user_role: { type: String, enum: ["student", "mentor"], required: true },
    company: { type: String, required: false },
    useracct: { type: String, required: false },
    usercalendlyacct: { type: String, required: false },
    usernotificationtoken: { type: String, required: false },
    designation: { type: String, required: false }
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    const isMatch = await compare(password, this.password);
    return isMatch;
};

UserSchema.methods.generateAccessToken = function () {
    return sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};


const User = mongoose.model("User", UserSchema);

export default User;