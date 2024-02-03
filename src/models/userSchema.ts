import mongoose, {Document} from "mongoose";

interface IUser extends Document {
    name: string;
    about: string;
    avatar: string;
  }

const UeserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    about: {type: String, required: true},
    avatar: {type: String, required: true},
})

export default mongoose.model<IUser>('UserSchema', UeserSchema)


