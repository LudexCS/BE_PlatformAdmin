import AppDataSource from "../config/mysql.config";
import {Game} from "../entity/game.entity"
import {Brackets, Repository} from "typeorm";
import {GameListRequestDto} from "../dto/gameListRequest.dto";
import {GameTempDetailDto} from "../dto/gameTempDetail.dto";

const gameRepo: Repository<Game> = AppDataSource.getRepository(Game);

export const findGameByTitle = async (gameTitle: string): Promise<Game | null> => {
    return await gameRepo
        .createQueryBuilder("game")
        .where("game.title = :title", { title: gameTitle })
        .getOne();
};