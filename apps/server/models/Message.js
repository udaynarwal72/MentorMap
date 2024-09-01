import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message: {
        type: [{
            text: String,
            sentById: mongoose.Types.ObjectId,
            sentBy: String,
            sentAt: Date,
        }],
        default: []
    },
    chatId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'chat'
    }
});

export default mongoose.model("message", MessageSchema);
