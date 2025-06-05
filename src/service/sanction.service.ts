import {
    saveSanctionGame,
    saveSanctionUser,
    deleteSanctionGameByGameId,
    deleteSanctionUserByUserId, findSanctionedGamesWithTitle, findSanctionedUsersWithInfo,
} from "../repository/sanction.repository";

import {findGameById, findGameByTitle, gameRepo} from "../repository/game.repository";
import {accountRepo, findAccountByEmail} from "../repository/account.repository";

export const registerSanctionGame = async (
    adminEmail: string,
    gameId: number,
    sanctionDetail: string
) => {
    const admin = await findAccountByEmail(adminEmail);
    if (!admin) throw new Error("Admin not found");
    const game = await findGameById(gameId);
    if (!game) throw new Error("Game not found");

    await saveSanctionGame(admin.id, game.id, sanctionDetail);
};

export const registerSanctionUser = async (
    adminEmail: string,
    userEmail: string,
    sanctionDetail: string
) => {
    const admin = await findAccountByEmail(adminEmail);
    if (!admin) throw new Error("Admin not found");
    const user = await findAccountByEmail(userEmail);
    if (!user) throw new Error("User not found");

    await saveSanctionUser(admin.id, user.id, sanctionDetail);
};

export const unsanctionGameById = async (gameId: number) => {
    const game = await findGameById(gameId);
    if (!game) throw new Error("Game not found");

    await deleteSanctionGameByGameId(game.id);
    await gameRepo.update({ id: game.id }, { isBlocked: true });
};

export const unsanctionUserByEmail = async (email: string) => {
    const user = await findAccountByEmail(email);
    if (!user) throw new Error("User not found");

    await accountRepo.update({ id: user.id }, { isBlocked: true });
    await deleteSanctionUserByUserId(user.id);
};

export const fetchSanctionedGames = async (page: number) => {
    const PAGE_SIZE = 20;
    const offset = (page - 1) * PAGE_SIZE;
    return await findSanctionedGamesWithTitle(offset, PAGE_SIZE);
};

export const fetchSanctionedUsers = async (page: number) => {
    const PAGE_SIZE = 20;
    const offset = (page - 1) * PAGE_SIZE;
    return await findSanctionedUsersWithInfo(offset, PAGE_SIZE);
};
