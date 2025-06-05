import { Request, Response} from "express";
import {getUserDataService, getUserListService} from "../service/searchUser.service";

export const getUserListControl = async (page: number) => {
    return await getUserListService(page);
}

export const getUserDataControl = async (nickname: string) => {
    return await getUserDataService(nickname);
}