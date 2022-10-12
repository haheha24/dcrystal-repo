import mongoose, { Schema } from "mongoose";
/*      TYPES       */
export interface ICustomerSchema {
  firstName: string;
  lastName: string;
  email: string;
  bookings: Schema.Types.ObjectId;
}

const CustomerSchema = new Schema<ICustomerSchema>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking", default: [] }],
});

//NextJS doesn't cache mongoose.models correctly, not sure how this fixes it.
//@ts-ignore
mongoose.models = {};

//Must export both due to NextJS not caching model User
const Customer =
  mongoose.models?.Customer ||
  mongoose.model<ICustomerSchema>("Customer", CustomerSchema);

export { Customer, CustomerSchema };
