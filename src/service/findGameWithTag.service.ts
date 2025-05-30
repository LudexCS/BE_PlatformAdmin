import { findGameWithTag } from '../repository/game.repository'
import {GamesListDto} from "../dto/gamesList.dto";
import {findTagByGameId} from "../repository/gameTag.repository";

export const findGameWithTagService = async (
    tags: string[]
) => {
    const taggedGameRows = await findGameWithTag(tags);

    const games: GamesListDto[] = await Promise.all(
        taggedGameRows.map(async (game: any) => {
            const allTags = await findTagByGameId(game.id);
            const baseDto: GamesListDto = {
                gameId: game.id,
                title: game.title,
                titleKo: game.titleKo,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                downloadTimes: game.downloadTimes,
                isBlocked: game.isBlocked,
                tags: allTags,
            };
            return baseDto;
        })
    );

    return games;
};
