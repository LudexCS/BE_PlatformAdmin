import {
    saveSanctionGame,
    saveSanctionUser,
    findAccountByEmail,
    findGameByTitle,
    deleteSanctionGameByGameId,
    deleteSanctionUserByUserId, findSanctionedGamesWithTitle, findSanctionedUsersWithInfo,
} from "../repository/sanction.repository";

export const registerSanctionGame = async (
    adminEmail: string,
    gameTitle: string,
    sanctionDetail: string
) => {
    const admin = await findAccountByEmail(adminEmail);
    if (!admin) throw new Error("Admin not found");

    const game = await findGameByTitle(gameTitle);
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

export const unsanctionGameByTitle = async (title: string) => {
    const game = await findGameByTitle(title);
    if (!game) throw new Error("Game not found");

    await deleteSanctionGameByGameId(game.id);
};

export const unsanctionUserByEmail = async (email: string) => {
    const user = await findAccountByEmail(email);
    if (!user) throw new Error("User not found");

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
