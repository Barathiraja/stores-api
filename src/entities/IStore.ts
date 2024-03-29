
import * as mongoose from 'mongoose';

interface IStore extends mongoose.Document {
    Id: number;
    phone: number;
    Name: string;
    Domain: string;
    Status: string;
    Street: string;
    State: string,
};

export default IStore;
