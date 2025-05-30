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
import reportRoute from './route/report.route';
import sanctionRoute from './route/sanction.route';
import postReportRoute from './route/postReport.route';
import gameDataRoute from './route/gameData.route';

const app : Express = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}))

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// jwt middleware
app.use('/api/protected', jwtGuard);
app.use('/api/admin', adminGuard);
app.use('/api/admin/tag', tagRoute);
app.use('/api/admin/term', termRoute);
app.use('/api/admin/banner', bannerRoute);
app.use('/api/get', getRoute);
app.use('/api/admin/report', reportRoute)
app.use('/api/admin/sanction', sanctionRoute);
app.use('/api/protected/report', postReportRoute);
app.use('/api/admin/get', gameDataRoute)

export default app;