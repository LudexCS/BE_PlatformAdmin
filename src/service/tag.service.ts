import {deleteTag, getTag, saveTag, updateTag} from "../repository/tag.repository";
import {Tag} from "../entity/tag.entity";
import {TagDto, toTagDto} from "../dto/tag.dto";
import {getChoseong} from "es-hangul";

export const registerTag = async (tagDto: TagDto)=> {
    const nameChoseong = getChoseong(tagDto.nameKo as string);
    const tag = new Tag();
    tag.setName(tagDto.name);
    tag.setNameKo(tagDto.nameKo as string);
    tag.setNameChoseong(nameChoseong);
    return await saveTag(tag);
};

export const editTag = async (tagDto: TagDto) => {
    tagDto.nameChoseong = getChoseong(tagDto.nameKo as string);
    await updateTag(tagDto);
};

export const removeTag = async (id: number)=> {
    await deleteTag(id);
};

export const findTag = async ()=> {
    const tags: Tag[] = await getTag();
    return tags.map(toTagDto);
};