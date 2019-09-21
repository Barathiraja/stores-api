import { Router, Request, Response, NextFunction } from 'express';
import { Api } from '../helpers';
import { ICustomer } from '../entities';
import * as Joi from "joi";
import { CustomerManager } from '../data-manager/customer.manager';
import { customerValidator } from '../validators/'

export class CustomerController {
    public static route = '/customers';
    public router: Router = Router();
    constructor() {
        this.router.post('/', this.addCustomer);
    }

    public addCustomer(request: Request, response: Response, next: NextFunction) {
        let customer: ICustomer = request.body;
        const validationResult = Joi.validate(customer, customerValidator);
        if (validationResult.error !== null) {
            Api.invalid(request, response, validationResult.error.message);
        } else {
            let manager = new CustomerManager();
            manager.addCustomer(request.body).then((result) => {
                return Api.ok(request, response, result);
            }, (err) => {
                if (err.stacktrace) {
                    delete err.stacktrace;
                }
                next(err);
            });
        }
    }

}



