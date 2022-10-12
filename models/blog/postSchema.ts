import mongoose, { Schema } from "mongoose";
/*      TYPES       */
export interface IPostSchema {
  title: string;
  meta: {
    title: string;
    description: string;
  };
  slug: string;
  summary: String;
  published: boolean;
  publish_date: Date;
  created_at: Date;
  updated_at: Date;
  content: string;
  comments: Schema.Types.ObjectId[];
  author_id: Schema.Types.ObjectId[];
  parent_post_id: Schema.Types.ObjectId;
}

const PostSchema = new Schema<IPostSchema>({
  title: {
    type: String,
    required: true,
  },
  meta: {
    title: {
      type: String,
      required: true,
    },
    description: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  summary: String,
  published: Boolean,
  publish_date: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
  content: { type: String, default: null },
  comments: [{ type: Schema.Types.ObjectId, ref: "PostComment", default: [] }],
  author_id: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  parent_post_id: {
    type: Schema.Types.ObjectId,
    ref: "PostComment",
    required: true,
  },
});

//NextJS doesn't cache mongoose.models correctly, not sure how this fixes it.
//@ts-ignore
mongoose.models = {};

//Must export both due to NextJS not caching model User
const Posts =
  mongoose.models?.Post || mongoose.model<IPostSchema>("Post", PostSchema);

export { Posts, PostSchema };
