import mongoose, {Schema, type Document} from 'mongoose';

export interface IMessage extends Document {
    chat: mongoose.Types.ObjectId; //id of the chat to which the message belongs
    sender: mongoose.Types.ObjectId;  //id of the user who sent the message
    text: string;  //content of the message
    createdAt: Date;  //timestamp of when the message was created 
    updatedAt: Date;  //timestamp of when the message was last updated
}


const MessageSchema = new Schema<IMessage>({
    chat : {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    sender : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    text : {
        type: String,
        required: true,
        trim: true
    }
    
    
    
}, {timestamps: true});

//indexes for faster queries
MessageSchema.index({chat: 1, createdAt: 1}); //index on chat and createdAt for faster retrieval of messages in a chat 
// 1 - ascending order, -1 - descending order


export const Message = mongoose.model('Message', MessageSchema);

