import {Request, Response} from "express";
import {
    fetchSanctionedGames, fetchSanctionedUsers,
    registerSanctionGame,
    registerSanctionUser,
    unsanctionGameByTitle,
    unsanctionUserByEmail,
} from "../service/sanction.service";

export const sanctionGameControl = async (req: Request, res: Response) => {
    const {adminEmail, gameTitle, sanctionDetail} = req.body;
    await registerSanctionGame(adminEmail, gameTitle, sanctionDetail);
};

export const sanctionUserControl = async (req: Request, res: Response) => {
    const {adminEmail, userEmail, sanctionDetail} = req.body;
    await registerSanctionUser(adminEmail, userEmail, sanctionDetail);
};

export const freeSanctionGameControl = async (req: Request, res: Response) => {
    const {gameTitle} = req.body;
    await unsanctionGameByTitle(gameTitle);
};

export const freeSanctionUserControl = async (req: Request, res: Response) => {
    const {email} = req.body;
    await unsanctionUserByEmail(email);
};

export const getSanctionedGamesControl = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    return await fetchSanctionedGames(page);
};

export const getSanctionedUsersControl = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    return await fetchSanctionedUsers(page);
};