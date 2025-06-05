import AppDataSource from "../config/mysql.config";
import { SanctionGame, SanctionUser } from "../entity/sanction.entity";
import {Account} from "../entity/account.entity";
import {Game} from "../entity/game.entity";
import {findItemIdByGameId, gameRepo} from "./game.repository";
import { accountRepo } from "./account.repository";
import {resumeSaleByItemId, suspendSaleByItemId} from "../grpc/itemAdministration.client";

export const saveSanctionGame = async (adminId: number, gameId: number, detail: string) => {
    const repo = AppDataSource.getRepository(SanctionGame);
    const entry = repo.create({
        adminId: adminId,
        gameId: gameId,
        sanctionDetail: detail,
        startedAt: new Date(),
    });

    const itemId = await findItemIdByGameId(gameId)
    suspendSaleByItemId(itemId);
    await gameRepo.update({ id: gameId }, { isBlocked: true });
    await repo.save(entry);
};

export const saveSanctionUser = async (adminId: number, userId: number, detail: string) => {
    const repo = AppDataSource.getRepository(SanctionUser);
    const entry = repo.create({
        adminId: adminId,
        userId: userId,
        sanctionDetail: detail,
        startedAt: new Date(),
    });

    await accountRepo.update({ id: userId }, { isBlocked: true });
    await repo.save(entry);
};

export const findSanctionedGamesWithTitle = async (offset: number, limit: number) => {
    return await AppDataSource.getRepository(SanctionGame)
        .createQueryBuilder("sanction")
        .leftJoin("game", "game", "game.id = sanction.game_id")
        .select([
            "game.title AS gameTitle",
            "sanction.sanction_detail AS sanctionDetail",
            "sanction.started_at AS startedAt",
        ])
        .orderBy("sanction.started_at", "DESC")
        .offset(offset)
        .limit(limit)
        .getRawMany();
};

export const findSanctionedUsersWithInfo = async (offset: number, limit: number) => {
    return await AppDataSource.getRepository(SanctionUser)
        .createQueryBuilder("sanction")
        .leftJoin("account", "user", "user.id = sanction.user_id")
        .select([
            "user.nickname AS nickname",
            "user.email AS email",
            "sanction.sanction_detail AS sanctionDetail",
            "sanction.started_at AS startedAt",
        ])
        .orderBy("sanction.started_at", "DESC")
        .offset(offset)
        .limit(limit)
        .getRawMany();
};

export const findAccountByEmail = async (email: string) =>
    await AppDataSource.getRepository(Account).findOne({ where: { email } });

export const findGameByTitle = async (title: string) =>
    await AppDataSource.getRepository(Game).findOne({ where: { title } });

export const deleteSanctionGameByGameId = async (gameId: number) => {
    await AppDataSource.getRepository(SanctionGame).delete({gameId: gameId});
    const itemId = await findItemIdByGameId(gameId);
    await resumeSaleByItemId(itemId);
}

export const deleteSanctionUserByUserId = async (userId: number) =>
    await AppDataSource.getRepository(SanctionUser).delete({ userId: userId });