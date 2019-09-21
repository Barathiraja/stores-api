
import * as mongoose from 'mongoose';

interface ICustomer extends mongoose.Document {
    Id: number;
    StoreId: number;
    Firstname: string;
    Lastname: string;
    Phone: string;
    Email: string;
};

export default ICustomer;

