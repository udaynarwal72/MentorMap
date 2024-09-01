import Server  from 'socket.io';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import isEmpty  from 'lodash';
import { authUser, login } from './sockets/user.js';
import User from '../Website-Backend/src/schema/UserSchema.js';
import Chats from './models/Chats.js';
import Message from './models/Message.js';
import ChatList from './models/ChatList.js';
import { 
    setRoom, 
    getUser, 
    getChat, 
    startChat, 
    sendMessage, 
    createGroup, 
    getMessage, 
    deleteChat, 
    joinGroup 
} from './sockets/chat.js';

const secret = "something";
const uri = "mongodb+srv://mentorsync27:mentorsync27@mentorsync.z9ppb.mongodb.net/?retryWrites=true&w=majority&appName=MentorSync";

const io = new Server(8080);
const userSocket = io.of('/user');
const chatSocket = io.of('/chat');

console.log(userSocket);

mongoose.connect(uri).then(() => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err);
});

userSocket.on("connection", (socket) => {
    console.log('hi');
    socket.on("auth", (data) => {
        console.log('hi')
        authUser(socket, data)
    });
    socket.on("login", (data) => login(socket, data));
});

chatSocket.use(async (socket, next) => {
    const token = socket.handshake.query.token;
    if (!isEmpty(token)) {
        const { email } = jwt.verify(token, secret);
        const user = await User.findOne({ email: email }).lean();
        socket.user = user;
    }
    next();
});

chatSocket.on("connection", (socket) => {
    socket.on("join-room", (data) => setRoom(data, socket));
    socket.on("search-user", (data) => getUser(data, socket));
    socket.on("get-chats", () => getChat(socket));
    socket.on("start-chat", (user, label) => startChat(user, label, socket));
    socket.on("get-message", (chatId) => getMessage(chatId, socket));
    socket.on("send-message", (chatId, userIds, message) => sendMessage(chatId, userIds, message, socket));
    socket.on('create-group', (users, label) => createGroup(users, label, socket));
    socket.on("join-group", (_id) => joinGroup(_id, socket));
    socket.on("delete-chat", (_id) => deleteChat(_id, socket));
});
