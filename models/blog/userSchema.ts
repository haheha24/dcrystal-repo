import mongoose, { Schema } from "mongoose";
/*      TYPES       */
export interface IUserSchema {
  name: String;
  email: String;
  image: String;
  provider: "GMAIL" | "FACEBOOK" | "TWITTER" | "EMAIL";
  role: "ADMIN" | "USER";
  comments: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUserSchema>({
  name: String,
  email: String,
  image: String,
  provider: {
    type: String,
    enum: ["GMAIL", "FACEBOOK", "TWITTER", "EMAIL"],
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "PostComment" }],
});

//NextJS doesn't cache mongoose.models correctly, not sure how this fixes it.
//@ts-ignore
mongoose.models = {};

//Must export both due to NextJS not caching model User
const User =
  mongoose.models?.User || mongoose.model<IUserSchema>("User", UserSchema);

export { User, UserSchema };
