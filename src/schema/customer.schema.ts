import * as mongoose from 'mongoose';
import { ICustomer } from "../entities";

const CustomerSchema = new mongoose.Schema({
    Id: { type: Number, required: true },
    StoreId: { type: Number, required: true },
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Phone: { type: String },
    Email: { type: String, required: true }
});

const Customer = mongoose.model<ICustomer>('customer', CustomerSchema);
export { Customer };
