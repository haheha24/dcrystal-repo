import mongoose, { Schema } from "mongoose";
/*      TYPES       */
export interface IPostCommentSchema {
  content: string;
  published: boolean;
  publish_date: Date;
  created_at: Date;
  parent_id: Schema.Types.ObjectId;
  post_id: Schema.Types.ObjectId;
  author_id: Schema.Types.ObjectId;
}

const PostCommentSchema = new Schema<IPostCommentSchema>({
  content: String,
  publish_date: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  parent_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  author_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

//NextJS doesn't cache mongoose.models correctly, not sure how this fixes it.
//@ts-ignore
mongoose.models = {};

//Must export both due to NextJS not caching model User
const PostComments =
  mongoose.models?.PostComment ||
  mongoose.model<IPostCommentSchema>("PostComment", PostCommentSchema);

export { PostComments, PostCommentSchema };
