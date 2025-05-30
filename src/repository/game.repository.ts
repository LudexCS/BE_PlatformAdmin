import AppDataSource from "../config/mysql.config";
import {Game} from "../entity/game.entity"
import {Brackets, Repository} from "typeorm";
import {GameListRequestDto} from "../dto/gameListRequest.dto";
import {GameTempDetailDto} from "../dto/gameTempDetail.dto";

export const gameRepo: Repository<Game> = AppDataSource.getRepository(Game);

export const findGameByTitle = async (gameTitle: string): Promise<Game | null> => {
    return await gameRepo
        .createQueryBuilder("game")
        .where("game.title = :title", { title: gameTitle })
        .getOne();
};


export const findGameList = async(gameListRequestDto: GameListRequestDto) =>{
    const baseQuery = await gameRepo.createQueryBuilder('game')
        .select([
            'game.id AS id',
            'game.title AS title',
            "game.titleKo AS titleKo",
            'game.thumbnail_url AS thumbnailUrl',
            'game.item_id AS itemId',
            'game.is_blocked AS isBlocked'
        ]);
    const offset = (gameListRequestDto.page - 1) * gameListRequestDto.limit;
    const limit = gameListRequestDto.limit;
    return await baseQuery
        .orderBy('game.download_times', 'DESC')
        .offset(offset)
        .limit(limit)
        .getRawMany();
};

export const findOriginGameList = async (
    gameId: number) => {
    const query = gameRepo
        .createQueryBuilder('game')
        .where(qb => {
            const subQuery = qb
                .subQuery()
                .select('og.origin_game_id')
                .from('origin_game', 'og')
                .where('og.game_id = :gameId')
                .getQuery();
            return 'game.id IN ' + subQuery;
        })
        .setParameter('gameId', gameId)
        .select([
            'game.id AS gameId',
            'game.title AS title',
            "game.titleKo AS titleKo",
            'game.thumbnail_url AS thumbnailUrl',
            'game.is_blocked AS isBlocked'
        ]);

    return await query.getRawMany();
};

export const findVarientGameList = async (
    gameId: number) => {
    const query = gameRepo
        .createQueryBuilder('game')
        .where(qb => {
            const subQuery = qb
                .subQuery()
                .select('og.game_id')
                .from('origin_game', 'og')
                .where('og.origin_game_id = :gameId')
                .getQuery();
            return 'game.id IN ' + subQuery;
        })
        .setParameter('gameId', gameId)
        .select([
            'game.id AS gameId',
            'game.title AS title',
            "game.titleKo AS titleKo",
            'game.thumbnail_url AS thumbnailUrl',
            'game.is_blocked AS isBlocked'
        ]);

    return await query.getRawMany();
};

export const isGameExist = async (id: number): Promise<boolean> => {
    return await gameRepo.exists({
        where: { id: id }
    });
}

export const findGameWithTag = async(tags: string[]) => {
    const tagCount = tags.length;


    const query = gameRepo
        .createQueryBuilder('game')
        .innerJoin('game_tag', 'gt', 'gt.game_id = game.id')
        .innerJoin('tag', 'tag', 'tag.id = gt.tag_id')
        .where('tag.name IN (:...tagNames)', { tagNames: tags })
        .groupBy('game.id')
        .having('COUNT(DISTINCT tag.id) = :tagCount', { tagCount })
        .orderBy('game.download_times', 'DESC');

    const selectFields = [
        'game.id AS id',
        'game.title AS title',
        'game.titleKo AS titleKo',
        'game.thumbnail_url AS thumbnailUrl',
        'game.item_id AS itemId',
        'game.price AS price',
        'game.description AS description',
        'game.download_times AS downloadTimes',
        'game.is_blocked AS isBlocked'
    ];
    return await query
        .select(selectFields)
        .getRawMany();
};

export const findGameDetailWithGameId = async(gameId: number): Promise<GameTempDetailDto> =>{
    try{
        const gameDetails = await gameRepo
            .createQueryBuilder("game")
            .select([
                "game.id AS id",
                "game.title AS title",
                "game.titleKo AS titleKo",
                "game.userId AS userId",
                "account.nickname AS nickName",
                "game.price AS price",
                "game.thumbnailUrl AS thumbnailUrl",
                "game.description AS description",
                "game.downloadTimes AS downloadTimes",
                "game.itemId AS itemId",
                "game.registeredAt AS registeredAt",
                "game.updatedAt AS updatedAt",
                'game.is_blocked AS isBlocked'
            ])
            .andWhere("game.id = :gameId", { gameId })
            .getRawOne();

        if(!gameDetails){
            throw new Error("게임 찾기 실패");
        }
        return gameDetails;
    } catch(err){
        throw err;
    }
}

export const searchGameByKeyword = async (keyword: string) => {
    const like = `%${keyword}%`;

    const query = gameRepo
        .createQueryBuilder('game')
        .leftJoin('game_tag', 'gt', 'gt.game_id = game.id')
        .leftJoin('tag', 'tag', 'tag.id = gt.tag_id')
        .select([
            'game.id AS id',
            'game.title AS title',
            'game.titleKo AS titleKo',
            'game.thumbnail_url AS thumbnailUrl',
            'game.item_id AS itemId',
            'game.price AS price',
            'game.description AS description',
            'game.download_times AS downloadTimes',
            'game.is_blocked AS isBlocked'
        ]);

    query.andWhere(new Brackets(qb => {
        qb.where('game.title LIKE :like', { like })
            .orWhere('game.title_ko LIKE :like', { like })
            .orWhere('game.description LIKE :like', { like })
            .orWhere('tag.name LIKE :like', { like })
            .orWhere('tag.name_ko LIKE :like', { like });
    }));

    query.groupBy('game.id')
        .orderBy('game.download_times', 'DESC');

    return await query.getRawMany();
};

export const searchGameByChoseong = async (keyword: string) => {
    const query = gameRepo
        .createQueryBuilder('game')
        .leftJoin('game_tag', 'gt', 'gt.game_id = game.id')
        .leftJoin('tag', 'tag', 'tag.id = gt.tag_id')
        .select([
            'game.id AS id',
            'game.title AS title',
            'game.titleKo AS titleKo',
            'game.thumbnail_url AS thumbnailUrl',
            'game.item_id AS itemId',
            'game.price AS price',
            'game.description AS description',
            'game.is_blocked AS isBlocked'
        ]);

    query.andWhere(new Brackets(qb => {
        qb.where('game.title_choseong = :keyword', { keyword })
            .orWhere('tag.name_choseong = :keyword', { keyword });
    }));

    query.groupBy('game.id')
        .orderBy('game.download_times', 'DESC');

    return await query.getRawMany();
};


/**
 * Finds games by a list of game IDs.
 * @param gameIds - Array of game IDs to search for
 * @returns Promise<any[]> List of games matching the IDs
 */
export const findGamesByIds = async (gameIds: number[]) => {
    if (gameIds.length === 0) return [];

    const query = gameRepo
        .createQueryBuilder('game')
        .select([
            'game.id AS id',
            'game.title AS title',
            'game.titleKo AS titleKo',
            'game.thumbnail_url AS thumbnailUrl',
            'game.item_id AS itemId',
            'game.price AS price',
            'game.description AS description',
            'game.download_times AS downloadTimes',
            'game.is_blocked AS isBlocked'
        ])
        .andWhere('game.id IN (:...gameIds)', { gameIds });
    return await query
        .orderBy('game.download_times', 'DESC')
        .getRawMany();
};