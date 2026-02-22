import mongoose, {Schema, type Document} from 'mongoose';

export interface IChat extends Document {
    participants : mongoose.Types.ObjectId[]; //array of user ids who are part of the chat
    lastMessage : mongoose.Types.ObjectId;  //array of message ids
    lastMesageAt?:Date;  //timestamp of the last message sent in the chat
    createdAt: Date;  // timestamp of when the chat was created
    updatedAt: Date;  // timestamp of when the chat was last updated

}

const chatSchema = new Schema<IChat>({
    
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

    ],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default : null
    },
    lastMesageAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

export const Chat = mongoose.model('Chat', chatSchema);



