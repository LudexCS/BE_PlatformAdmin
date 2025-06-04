import { Request, Response} from "express";
import {getUserDetailService, getUserListService} from "../service/searchUser.service";

export const getUserListControl = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    return await getUserListService(page);
}

export const getUserDetailControl = async (req: Request, res: Response) => {
    const userId = parseInt(req.query.userId as string);
    if (!userId) {
        throw new Error("Missing userId.");
    }
    return await getUserDetailService(userId);
}