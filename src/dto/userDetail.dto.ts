import { Account } from "../entity/account.entity"

export interface UserDetail {
    id: number;
    email: string;
    nickname: string;
    isBlocked: boolean;
}

export function toUserDataDto(account: Account): UserDetail {
    return {
        id: account.id,
        email: account.email,
        nickname: account.nickname,
        isBlocked: account.isBlocked,
    }
}