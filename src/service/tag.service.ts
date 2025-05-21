import {deleteTag, getTag, saveTag, updateTag} from "../repository/tag.repository";
import {Tag} from "../entity/tag.entity";
import {TagDto, toTagDto} from "../dto/tag.dto";

export const registerTag = async (tagDto: TagDto)=> {
    const tag = new Tag();
    tag.setName(tagDto.name);
    tag.setNameKo(tagDto.nameKo as string);
    return await saveTag(tag);
};

export const editTag = async (tagDto: TagDto) => {
    await updateTag(tagDto);
};

export const removeTag = async (id: number)=> {
    await deleteTag(id);
};

export const findTag = async ()=> {
    const tags: Tag[] = await getTag();
    return tags.map(toTagDto);
};