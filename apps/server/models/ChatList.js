import mongoose from "mongoose";

const ChatListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    chats: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'chat'
    }
});

export default mongoose.model("chatlist", ChatListSchema);
