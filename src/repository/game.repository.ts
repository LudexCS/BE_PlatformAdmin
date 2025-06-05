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

export const findItemIdByGameId = async (gameId: number) =>{
    const result = await gameRepo
        .createQueryBuilder("game")
        .where("game.Id = :id", { id: gameId })
        .select("game.itemId")
        .getOne();

    return result?.itemId as string ?? null;
}

export const findGameById = async (gameId: number): Promise<Game | null> => {
    return await gameRepo
        .createQueryBuilder("game")
        .where("game.id = :id", { id: gameId })
        .getOne();
};