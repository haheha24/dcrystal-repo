import mongoose, { Schema } from "mongoose";
/*      TYPES       */
export interface ICategorySchema {
  name: string;
  tag_id: Schema.Types.ObjectId[];
  post_id: Schema.Types.ObjectId[];
}

const CategorySchema = new Schema<ICategorySchema>({
  name: { type: String, required: true, unique: true },
  tag_id: [{ type: Schema.Types.ObjectId, ref: "Tag", unique: true }],
  post_id: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
});

//NextJS doesn't cache mongoose.models correctly, not sure how this fixes it.
//@ts-ignore
mongoose.models = {};

//Must export both due to NextJS not caching model User
const Category =
  mongoose.models?.Category ||
  mongoose.model<ICategorySchema>("Category", CategorySchema);

export { Category, CategorySchema };
