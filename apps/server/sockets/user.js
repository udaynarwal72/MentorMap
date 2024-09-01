import pkg from "lodash";
const { isEmpty } = pkg;
import User from '../models/User.js';
import jwt from "jsonwebtoken";
import ChatList from '../models/ChatList.js';

const secret = "dkj10nov2002";

export const authUser = async (socket, token) => {
    try {
        console.log('hi')
        const { email } = jwt.verify(token, secret);
        const user = await User.findOne({ email: email }).lean();
        if (isEmpty(user)) throw new Error("Invalid token");
        socket.emit("auth-success", user);
    } catch (err) {
        console.log(err, token);
        socket.emit("auth-error", "Invalid token");
    }
};

export const login = async (socket, userData) => {
    let user = await User.findOne({ email: userData.email });
    if (isEmpty(user)) {
        user = {
            email: userData.email,
            name: userData.displayName,
            profilePic: userData.photoURL
        };
        const newUser = new User(user);
        await newUser.save();
        const newChatList = new ChatList({
            userId: newUser._id
        });
        await newChatList.save();
    }
    const token = jwt.sign({ email: user.email }, secret);
    socket.emit("login-success", token);
};


