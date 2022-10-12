import mongoose, { Schema } from "mongoose";
/*      TYPES       */
export interface IServiceSchema {
  serviceName: string;
  serviceCost: number;
}

const ServiceSchema = new Schema<IServiceSchema>({
  serviceName: { type: String, required: true },
  serviceCost: { type: Number, required: true },
});

//NextJS doesn't cache mongoose.models correctly, not sure how this fixes it.
//@ts-ignore
mongoose.models = {};

//Must export both due to NextJS not caching model User
const Services =
  mongoose.models?.Service ||
  mongoose.model<IServiceSchema>("Service", ServiceSchema);

export { Services, ServiceSchema };
