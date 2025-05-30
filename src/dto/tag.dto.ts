import {Tag} from "../entity/tag.entity";

export interface TagDto {
    id?: number;
    name: string;
    nameKo?: string;
    nameChoseong?: string;
}

export function toTagDto(tag: Tag): TagDto {
    return {
        id: tag.id,
        name: tag.name
    };
}