import * as mongoose from 'mongoose';
import { IStore } from "../entities";

const StoreSchema = new mongoose.Schema({
    Id: { type: Number, required: true },
    Name: { type: String },
    Domain: { type: String },
    phone: { type: String },
    Status: { type: String },
    Street: { type: String }
});

const Store = mongoose.model<IStore>('store', StoreSchema);
export { Store };
