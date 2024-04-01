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

const userSchema = new Schema({
        hash:{
            type:String,
            required:true
        },
        username: {
            unique:true,
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        email: {
            unique:true,
            type: String,
            required: true,
        },
        messages : {
            type:[messageSchema],
            default:[]
        },
    },
    { timestamps: true }
);


export type UserType = InferSchemaType<typeof userSchema> & {
    _id:string
};



export const UserModel = mongoose.models.User || mongoose.model("User",userSchema);
export const MessageModel = mongoose.models.Message || mongoose.model("Message",messageSchema);
