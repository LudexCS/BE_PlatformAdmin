import AppDataSource from "../config/mysql.config";
import { SanctionGame, SanctionUser } from "../entity/sanction.entity";
import {Account} from "../entity/account.entity";
import {Game} from "../entity/game.entity";

export const saveSanctionGame = async (adminId: number, gameId: number, detail: string) => {
    const repo = AppDataSource.getRepository(SanctionGame);
    const entry = repo.create({
        adminId: adminId,
        gameId: gameId,
        sanctionDetail: detail,
        startedAt: new Date(),
    });
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

export const deleteSanctionGameByGameId = async (gameId: number) =>
    await AppDataSource.getRepository(SanctionGame).delete({ gameId: gameId });

export const deleteSanctionUserByUserId = async (userId: number) =>
    await AppDataSource.getRepository(SanctionUser).delete({ userId: userId });