import { Router, Request, Response, NextFunction } from 'express';
import { Api } from '../helpers';
// import { IStore } from '../entities';
import { StoreManager, CustomerManager } from '../data-manager/';
import { storeValidator } from '../validators/'
import { IStore } from '../entities';
const Joi = require('joi');
export class StoreController {
    public static route = '/stores';
    public router: Router = Router();
    constructor() {

        this.router.get('/', this.getAllStores);
        this.router.get('/:searchtext/search', this.getStoreByName)
        this.router.get('/:id', this.getStoreById);
        this.router.put('/:id', this.updateStore);
        this.router.get('/:id/customers', this.getCustomerByStoreId);

    }

    public getStoreById(request: Request, response: Response, next: NextFunction) {
        let manager = new StoreManager();
        let id = parseInt(request.params['id'], 0);
        manager.getStoreById(id).then((result) => {
            return Api.ok(request, response, result);
        }, (err) => {
            next(err);
        });
    }

    public getAllStores(request: Request, response: Response, next: NextFunction) {
        let manager = new StoreManager();
        let isCustomerCountRequired = request.query["customercount"] === "true" ? true : false;
        manager.getAllStores(isCustomerCountRequired).then((result) => {
            return Api.ok(request, response, result);
        }, (err) => {
            next(err);
        });
    }

    public updateStore(request: Request, response: Response, next: NextFunction) {
        let store: IStore = request.body;
        const validationResult = Joi.validate(store, storeValidator);
        if (validationResult.error !== null) {
            Api.invalid(request, response, validationResult.error.message);
        } else {
            let storeId = parseInt(request.params['id'], 0);
            let manager = new StoreManager();
            manager.updateStore(storeId, store).then((result) => {
                return Api.ok(request, response, result);
            }, (err) => {
                next(err);
            });
        }
    }


    public getCustomerByStoreId(request: Request, response: Response, next: NextFunction) {
        let manager = new CustomerManager();
        let id = parseInt(request.params['id'], 0);
        manager.getCustomerByStoreId(id).then((result) => {
            return Api.ok(request, response, result);
        }, (err) => {
            next(err);
        });
    }

    public getStoreByName(request: Request, response: Response, next: NextFunction) {
        let manager = new StoreManager();
        let searchtext = request.params.searchtext;
        manager.getStoreByName(searchtext).then((result) => {
            return Api.ok(request, response, result);
        }, (err) => {
            next(err);
        });
    }

}



