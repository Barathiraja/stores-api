import { Router, Request, Response, NextFunction, Express } from 'express';
import { AppSetting } from './../config';
const swaggerUi = require('swagger-ui-express');
const Store = require("../swagger-docs/store.swagger.json");
const Customer = require("../swagger-docs/customer.swagger.json");
export class SwaggerController {

    public static configure(app: Express) {
        app.use('/api/v1/swagger/stores', swaggerUi.serve, swaggerUi.setup(Store));
        app.use('/api/v1/swagger/customers', swaggerUi.serve, swaggerUi.setup(Customer));
    }
}
