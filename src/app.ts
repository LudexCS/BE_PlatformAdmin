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
import sendEmailRoute from './route/sendEmail.route';
import userRoute from './route/searchUser.route'

const app : Express = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://uosludex.com', 'https://uosludex.com'],
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
app.use('/platformadmin/api/admin/report', reportRoute)
app.use('/platformadmin/api/admin/sanction', sanctionRoute);
app.use('/platformadmin/api/protected/report', postReportRoute);
app.use('/platformadmin/api/admin/send', sendEmailRoute);
app.use('/platformadmin/api/admin/user', userRoute);

export default app;