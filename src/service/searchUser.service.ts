import {findUserDataByNickname, findUsers} from "../repository/account.repository";

export const getUserListService = async (page: number) =>{
    const PAGE_SIZE = 20;
    const offset = (page - 1) * PAGE_SIZE;
    return await findUsers(offset, PAGE_SIZE);
}

export const getUserDataService = async (nickname: string) =>{
    return await findUserDataByNickname(nickname);
}