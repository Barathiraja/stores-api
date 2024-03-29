import { Router, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';

import * as http from 'http';
import * as compression from 'compression';
import * as express from 'express';

import { Logger } from './helpers/logger';
import { ApiRouting } from './api.routing';
import * as cors from 'cors';
import { Api } from './helpers/api';
import { IConfig, AppSetting } from './config';
import { SwaggerController } from './controller/swagger.controller';
import { AuthenticationModule } from './helpers/authentication.module';

export class ExpressApi {
    public app: express.Express;
    private router: express.Router;
    private config: IConfig;


    constructor() {
        this.app = express();
        this.router = express.Router();
        this.config = AppSetting.getConfig();
        this.configure();
    }

    private configure() {
        this.configureMiddleware();
        this.configureBaseRoute();
        this.configureRoutes();
        this.errorHandler();
    }

    private configureMiddleware() {
        this.app.use(json({ limit: '50mb' }));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(urlencoded({ limit: '50mb', extended: true }));
        AuthenticationModule.authenticate(this.app);
        Logger.configureLogger(this.app);
    }

    private configureBaseRoute() {
        let config = AppSetting.getConfig();
        this.app.use(function (req, res, next) {
            if (req.url === config.appConfig.baseurl) {
                return res.json({ name: config.appConfig.name, version: config.appConfig.version, env: config.appConfig.env });
            } else {
                next();
            }
        });
        this.app.use(config.appConfig.baseurl, this.router);
    }

    private configureRoutes() {
        this.app.use(function (req: Request, res: Response, next: NextFunction) {
            for (let key in req.query) {
                if (key) {
                    req.query[key.toLowerCase()] = req.query[key];
                }
            }
            next();
        });

        ApiRouting.ConfigureRouters(this.app);
        SwaggerController.configure(this.app);
    }

    private errorHandler() {
        this.app.use(function (err, req, res, next) {
            if (req.body) {
                Logger.error(req.body);
            }
            Logger.error(err);
            Api.serverError(req, res, err);
        });

        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            Api.notFound(req, res);
        });
    }


    public run() {
        let server = http.createServer(this.app);
        server.listen(this.config.port);
        server.on('error', this.onError);
    }

    private onError(error) {
        let port = this.config.port;
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}
