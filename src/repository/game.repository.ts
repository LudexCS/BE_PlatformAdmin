import AppDataSource from "../config/mysql.config";
import {Game} from "../entity/game.entity"
import {Repository} from "typeorm";

export const gameRepo: Repository<Game> = AppDataSource.getRepository(Game);

export const findGameByTitle = async (gameTitle: string): Promise<Game | null> => {
    return await gameRepo
        .createQueryBuilder("game")
        .where("game.title = :title", { title: gameTitle })
        .getOne();
};