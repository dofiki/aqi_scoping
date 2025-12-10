import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import { LocationDoc } from "./location.model";

// interface with instance methods
export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  trackedLocation: mongoose.Types.ObjectId[] | LocationDoc[];
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
      trim: true,
    },
    trackedLocation: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
  },
  { timestamps: true }
);

// instance methods
userSchema.methods.validatePassword = async function (
  passwrod: string
): Promise<boolean> {
  return bcrypt.compare(passwrod, this.passwordHash);
};

// creating model
export const User = mongoose.model<IUser>("User", userSchema);
