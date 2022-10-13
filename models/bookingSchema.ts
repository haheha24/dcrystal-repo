import mongoose, { Schema } from "mongoose";
import { ServiceSchema } from "./serviceSchema";
/*      TYPES       */
export interface IBookingSchema {
  bookingCreation: Date;
  bookingTimeSlot: {
    slotStart: Date;
    slotEnd: Date;
  };
  customerNote: string;
  confirmationEmailSent: boolean;
  confirmationEmailVerified: boolean;
  paymentType: "STRIPE" | "PAYPAL" | "GOOGLEPAY" | "APPLEPAY";
  paymentPromo: number;
  paymentDiscount: number;
  paymentTotal: number;
  termsConditionsPrivacy: boolean;

  service: Schema.Types.ObjectId;
  customerId: Schema.Types.ObjectId;
}

/*      BOOKING SCHEMA       */
const BookingSchema = new Schema<IBookingSchema>({
  bookingCreation: { type: Date, required: true, default: Date.now() },
  bookingTimeSlot: {
    slotStart: { type: Date, required: true },
    slotEnd: { type: Date, required: true },
  },
  customerNote: String,
  confirmationEmailSent: Boolean,
  confirmationEmailVerified: Boolean,
  paymentType: {
    type: String,
    enum: ["STRIPE", "PAYPAL", "GOOGLEPAY", "APPLEPAY"],
    required: true,
  },
  paymentPromo: String,
  paymentDiscount: Number,
  paymentTotal: {
    type: Number,
    required: true,
  },
  termsConditionsPrivacy: {
    type: Boolean,
    default: false,
    required: true,
  },
  service: { type: ServiceSchema, required: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
});

//NextJS doesn't cache mongoose.models correctly, not sure how this fixes it.
//@ts-ignore
mongoose.models = {};

//Must export both due to NextJS not caching model User
const Bookings =
  mongoose.models?.Booking ||
  mongoose.model<IBookingSchema>("Booking", BookingSchema);

export { Bookings, BookingSchema };
