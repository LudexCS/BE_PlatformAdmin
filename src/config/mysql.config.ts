import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {Tag} from "../entity/tag.entity";
import {Term} from "../entity/term.entity";
import {TermVersion} from "../entity/termVersion.entity";
import {Banner} from "../entity/banner.entity";
import {Account} from "../entity/account.entity";
import {ReportEntity} from "../entity/report.entity";
import {SanctionGame, SanctionUser} from "../entity/sanction.entity";
import {Game} from "../entity/game.entity";
import {SendedEmail} from "../entity/sendedEmail.entity";

const HOST = process.env.DB_HOST || 'localhost';
const PORT = Number(process.env.DB_PORT) || 3306;
const USER_NAME = process.env.DB_USER_NAME || 'username';
const PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME;

const AppDataSource = new DataSource({
    type: 'mysql',
    host: HOST,
    port: PORT,
    username: USER_NAME,
    password: PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: true,
    entities: [ Tag, Term, TermVersion, Banner, Account, ReportEntity, SanctionUser, SanctionGame, Game, SendedEmail],
    migrations: [],
    subscribers: [],
});

export default AppDataSource;
