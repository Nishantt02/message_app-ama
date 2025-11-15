// import mongoose, { Schema, Document } from 'mongoose';

// // this is the interface of the message..
// // it show how the msg looks like it only done in typescript..
// export interface Message extends Document {
//   _id:string
//   content: string;
//   createdAt: Date;
// }

// // this is the schema of the message 
// const MessageSchema: Schema<Message> = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     required: true,
//     default: Date.now,
//   },
// });

// // interface of the User
// export interface User extends Document {
//   username: string;
//   email: string;
//   password: string;
//   verifyCode: string;
//   verifyCodeExpiry: Date; 
//   isVerified: boolean;
//   isAcceptingMessages: boolean;
//   messages: Message[];
// }

// //  User schema
// const UserSchema: Schema<User> = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, 'Username is required'],
//     trim: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     match: [/.+\@.+\..+/, 'Please use a valid email address'],
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//   },
//   verifyCode: {
//     type: String,
//     required: [true, 'Verify Code is required'],
//   },
//   verifyCodeExpiry: {
//     type: Date,
//     required: [true, 'Verify Code Expiry is required'],
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   isAcceptingMessages: {
//     type: Boolean,
//     default: true,
//   },
//   messages: [MessageSchema],
// });

// const UserModel =
//   (mongoose.models.User as mongoose.Model<User>) ||
//   mongoose.model<User>('User', UserSchema);

// export default UserModel;

import mongoose, { Schema, Document, Types } from 'mongoose';

/* ---------- MESSAGE ---------- */
// import { Types } from "mongoose";

export interface Message {
  _id: string | Types.ObjectId;
  content: string;
  createdAt: Date;
}


const MessageSchema = new Schema<Message>({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* ---------- USER ---------- */
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
