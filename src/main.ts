
import { ExpressApi } from './express.api';
import { AppSetting } from './config';
import { mongo } from './helpers/mongoose/mongoose.config';

let api = new ExpressApi();

api.run();
console.log(`listening on ${AppSetting.getConfig().port}`);
mongo.setConnection();
let app = api.app;
export { app };
