import mongoose, { Schema, InferSchemaType , Types } from 'mongoose';

const messageSchema = new Schema({
    receivers:{
        type:[{type:Types.ObjectId,ref:"User"}],
        required:true
    },
    sender:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    isReplied:{
        type:Boolean,
        default:false
    },
    repliedTo:{
        type:mongoose.Types.ObjectId,
        ref:"Message"
    }

})

export type MessageType = InferSchemaType<typeof messageSchema> & {
    _id:string
};

export const MessageModel = mongoose.models.Message || mongoose.model("Message",messageSchema);
