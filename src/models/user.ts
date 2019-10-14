import bcryptjs from 'bcryptjs';
import { Document, model, Model, Schema } from 'mongoose';

export interface IUserDocument extends Document {
  username: string;
  password: string;
  email: string;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  hashPassword: (password: string) => Promise<string>;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.comparePassword = async function(password: string) {
  return bcryptjs.compare(password, this.password);
};

userSchema.statics.hashPassword = async (password: string) => {
  return bcryptjs.hash(password, 12);
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
