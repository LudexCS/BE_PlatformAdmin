import AppDataSource from '../config/mysql.config'
import { Account } from '../entity/account.entity';
import { Repository } from "typeorm";

export const accountRepo: Repository<Account> = AppDataSource.getRepository(Account);

export const findIdByEmail = async (email: string) => {
    const account = await accountRepo.findOne({where: {email}, select: ['id']});
    if (!account) {
        throw new Error(`Account with email ${email} not found`);
    }
    return account.id;
};

export const findAccountByEmail = async (email: string): Promise<Account | null> => {
    return await accountRepo
        .createQueryBuilder("account")
        .where("account.email = :email", { email })
        .getOne();
};

export const findUsers = async (offset: number, limit: number) =>{
    return await accountRepo
        .createQueryBuilder("account")
        .orderBy("id", "DESC")
        .skip(offset)
        .take(limit)
        .getMany();
}

export const findUserDetailById = async (userId: number) => {
    return await accountRepo
        .findOne({
        where: { id: userId },
        select: ["id", "email", "nickname", "isBlocked"],
    });
};