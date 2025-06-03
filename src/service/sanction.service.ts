import {
    saveSanctionGame,
    saveSanctionUser,
    deleteSanctionGameByGameId,
    deleteSanctionUserByUserId,
    findSanctionedGamesWithTitle,
    findSanctionedUsersWithInfo,
    hasResourceSanction,
    deleteSanctionResourceByGameId,
} from "../repository/sanction.repository";

import {findGameById, findGameByTitle, gameRepo} from "../repository/game.repository";
import {accountRepo, findAccountByEmail} from "../repository/account.repository";
import {findVariantsByOriginId} from "../repository/originGame.repository";
import {Reason} from "../entity/sanction.entity";

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

export const registerSanctionGameWithResource = async(
    adminEmail: string,
    gameId: number,
    sanctionDetail: string
)=> {
    const admin = await findAccountByEmail(adminEmail);
    if (!admin) throw new Error("Admin not found");
    const game = await findGameById(gameId);
    if (!game) throw new Error("Game not found");

    const isResourceSanctioned = await hasResourceSanction(gameId);
    if (isResourceSanctioned) return; // RESOURCE 제재가 이미 있으면 건너뜀

    await saveSanctionGame(admin.id, gameId, sanctionDetail, Reason.RESOURCE);

    const variantGames = await findVariantsByOriginId(gameId);
    for (const variant of variantGames) {
        await registerSanctionGameWithResource(adminEmail, variant.gameId, sanctionDetail);
    }
}

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
    await gameRepo.update({ id: game.id }, { isBlocked: false });
};

export const unsanctionResourceById = async (gameId: number) => {
    const game = await findGameById(gameId);
    if (!game) throw new Error("Game not found");

    await deleteSanctionResourceByGameId(game.id);
    await gameRepo.update({ id: game.id }, { isBlocked: false });

    const variantGames = await findVariantsByOriginId(game.id);
    for (const variant of variantGames) {
        await unsanctionResourceById(variant.gameId);
    }
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
