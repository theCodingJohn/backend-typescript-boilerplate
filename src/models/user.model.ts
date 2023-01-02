import mongoose, { Schema, Document } from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: String,
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>("User", UserSchema);
