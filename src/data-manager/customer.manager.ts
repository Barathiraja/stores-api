
import { Customer } from '../schema';
import { ICustomer } from '../entities'

export class CustomerManager {
    private collection
    constructor() {
        this.collection = Customer;
    }
    public addCustomer = async (customer: ICustomer) => {
        try {
            let customerData = await this.collection.find({ Id: customer.Id });
            if (customerData.length) {
                throw new Error("Document already available with same Id");
            } else {
                let newCustomer = new Customer(customer);
                const result = await newCustomer.save();
                return result;
            }
        } catch (err) {
            throw err;
        }

    }
    public getCustomerByStoreId = async (storeId: number) => {
        try {
            let query = { StoreId: storeId }
            let projection = { Firstname: 1, Lastname: 1, Email: 1 }
            const results = await this.collection.find(query, projection);
            return results;
        } catch (err) {
            throw err
        }
    }
}

const inst = new CustomerManager()
