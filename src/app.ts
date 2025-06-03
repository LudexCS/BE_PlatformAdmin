import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs, swaggerUiOptions } from './config/swagger.config';
import jwtGuard from './middleware/jwt.guard';
import tagRoute from "./route/tag.route";
import adminGuard from "./middleware/admin.guard";
import bannerRoute from "./route/banner.route";
import termRoute from "./route/term.route";
import getRoute from './route/get.route';

const app : Express = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}))

// Swagger UI 설정
app.use('/platformadmin/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// jwt middleware
app.use('/platformadmin/api/protected', jwtGuard);
app.use('/platformadmin/api/admin', adminGuard);
app.use('/platformadmin/api/admin/tag', tagRoute);
app.use('/platformadmin/api/admin/term', termRoute);
app.use('/platformadmin/api/admin/banner', bannerRoute);
app.use('/platformadmin/api/get', getRoute);

export default app;