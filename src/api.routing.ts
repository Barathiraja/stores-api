import * as express from 'express';
import { CustomerController } from './controller/customer.controller';
import { StoreController } from './controller/store.controller';
import { Api } from './helpers';
import { IConfig, AppSetting, Environment } from './config';
export class ApiRouting {

    public static ConfigureRouters(app: express.Router) {

        let controllers = [
            { name: CustomerController, router: new CustomerController().router },
            { name: StoreController, router: new StoreController().router }
        ];
        let config: IConfig = AppSetting.getConfig();

        for (let controller = 0; controller < controllers.length; controller++) {
            let currentcontroller = controllers[controller];
            app.use(config.appConfig.baseurl + currentcontroller["name"].route, currentcontroller.router);
        }
    }
}
