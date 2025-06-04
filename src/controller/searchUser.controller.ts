import { Request, Response} from "express";
import {getUserListService} from "../service/searchUser.service";

export const getUserListControl = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    return await getUserListService(page);
}

export const getUserDataControl = async (req: Request, res: Response) => {

}