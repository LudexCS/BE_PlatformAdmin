import { GameListRequestDto} from "../dto/gameListRequest.dto";
import { findGameList, findOriginGameList, findVarientGameList } from '../repository/game.repository'
import {Game} from "../entity/game.entity";


export const getGameList = async(gameListRequestDto: GameListRequestDto) => {
    const gameListRows =  await findGameList(gameListRequestDto);

    return gameListRows.map((game) => {
        const base = {
            gameId: game.id,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl,
            itemId: game.itemId,
            isBlocked: game.isBlocked
        };
        return base;
    });
}

export const getOriginGameInfo = async(gameId: number) => {
    const originGameListRows = await findOriginGameList(gameId);
    return originGameListRows.map((game) => {
        const base = {
            gameId: game.gameId,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl,
            isBlocked: game.isBlocked
        };
        return base;
    });
};

export const getVariantGameInfo = async(gameId: number) => {
    const varientGameRows = await findVarientGameList(gameId);

    return varientGameRows.map((game) => {
        const base = {
            gameId: game.gameId,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl,
            isBlocked: game.isBlocked
        };
        return base;
    });
};