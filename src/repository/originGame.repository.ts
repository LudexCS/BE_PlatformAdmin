import AppDataSource from "../config/mysql.config";
import { OriginGame } from "../entity/originGame.entity";

const originGameRepo = AppDataSource.getRepository(OriginGame);

export const findVariantsByOriginId = async (originGameId: number) => {
    return await originGameRepo.find({
        where: { originGameId: originGameId },
        select: ['gameId'],
    });
};