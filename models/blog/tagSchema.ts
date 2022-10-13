import mongoose, { Schema } from "mongoose";
/*      TYPES       */
export interface ITagSchema {
  name: string;
  category_id: Schema.Types.ObjectId[];
  post_id: Schema.Types.ObjectId[];
}

const TagSchema = new Schema<ITagSchema>({
  name: { type: String, required: true },
  category_id: [{ type: Schema.Types.ObjectId, ref: "Category", default: [] }],
  post_id: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
});

//NextJS doesn't cache mongoose.models correctly, not sure how this fixes it.
//@ts-ignore
mongoose.models = {};

//Must export both due to NextJS not caching model User
const Tag =
  mongoose.models?.Tag || mongoose.model<ITagSchema>("Tag", TagSchema);

export { Tag, TagSchema };
