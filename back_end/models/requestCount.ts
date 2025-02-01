// models/requestCount.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IRequestCount extends Document {
  userId: string;
  count: number;
  lastRequest: Date;
}

const requestCountSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  lastRequest: { type: Date, default: Date.now },
});

const RequestCount = mongoose.model<IRequestCount>('RequestCount', requestCountSchema);

export default RequestCount;
export { IRequestCount };
