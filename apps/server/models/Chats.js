import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    users: {
        type: [{ name: String, userId: mongoose.Types.ObjectId, profilePic: String }],
        required: true
    },
    chatType: {
        type: String,
        enum: ['personal', 'group'],
        default: 'personal'
    }
});

export default mongoose.model("chat", ChatSchema);
