import { AppSetting, IConfig } from '../../config';
import * as mongoose from 'mongoose';
import { ConfigManager } from '../../config/config.manager';
export class MongooseConfig {
    private mongoconnection;
    public setConnection() {
        const config: IConfig = AppSetting.getConfig();
        const dbInfo = config.dbConnections['default'];
        let connectionstring = "mongodb://localhost:27017/shared-dev"
        // let connectionstring = `mongodb://${dbInfo.host}:${dbInfo.port}/${dbInfo.database}`
        this.mongoconnection = mongoose.connect(connectionstring, {
            useNewUrlParser: true, useUnifiedTopology: true,
            useFindAndModify: false
        });
    }
}

export const mongo = new MongooseConfig();
