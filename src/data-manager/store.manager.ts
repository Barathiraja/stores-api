
import { Store } from '../schema';
import { IStore } from '../entities'
import { storequeries } from "../queries/store.query"

export class StoreManager {
    private collection
    constructor() {
        this.collection = Store;
    }
    public getStoreById = async (storeId: number) => {
        try {
            const store = await this.collection.findOne({ Id: storeId });
            if (store === null || store === undefined) {
                throw new Error("No Store Found for given Id");
            }
            return store;
        } catch (err) {
            throw err;
        }
    }

    public getAllStores = async (isCustomerCountRequired) => {
        try {
            if (isCustomerCountRequired) {
                const results = this.getCustomerCount();
                return results;
            } else {

                const stores = await this.collection.find({});
                if (!stores.length) {
                    throw new Error("No Stores Found");
                }
                return stores;
            }
        } catch (err) {
            throw err;
        }

    }

    public updateStore = async (storeId, store) => {
        try {
            const updateQuery = { Id: storeId };
            const result = await this.collection.findOne();
            if (result == null || result === undefined) {
                throw new Error("No Store Found for given Id");
            }
            for (let key in store) {
                if (store[key] !== undefined) {
                    result[key] = store[key]
                }
            }
            const finalResult = await result.save();
            return finalResult;

        } catch (err) {
            throw err;
        }
    }

    public getCustomerCount = () => {
        try {
            return new Promise((resolve, reject) => {
                this.collection.aggregate(storequeries.customercount).exec((err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                });
            })
        } catch (err) {
            throw err;
        }
    }

    public getStoreByName = async (searchtext) => {
        try {
            const results = this.collection.find({ "Name": { $regex: searchtext, $options: 'i' } });
            return results;
        } catch (err) {
            throw err;
        }

    }

}


