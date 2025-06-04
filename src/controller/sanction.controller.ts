import {Request, Response} from "express";
import {
    fetchSanctionedGames, fetchSanctionedUsers,
    registerSanctionGame,
    registerSanctionUser,
    unsanctionGameByTitle,
    unsanctionUserByEmail,
} from "../service/sanction.service";

export const sanctionGameControl = async (adminEmail: string, gameTitle: string, sanctionDetail: string) => {
    await registerSanctionGame(adminEmail, gameTitle, sanctionDetail);
};

export const sanctionUserControl = async (adminEmail: string, userEmail: string, sanctionDetail: string) => {
    await registerSanctionUser(adminEmail, userEmail, sanctionDetail);
};

export const freeSanctionGameControl = async (gameTitle: string) => {
    await unsanctionGameByTitle(gameTitle);
};

export const freeSanctionUserControl = async (email: string) => {
    await unsanctionUserByEmail(email);
};

export const getSanctionedGamesControl = async (page: number) => {
    return await fetchSanctionedGames(page);
};

export const getSanctionedUsersControl = async (page: number) => {
    return await fetchSanctionedUsers(page);
};