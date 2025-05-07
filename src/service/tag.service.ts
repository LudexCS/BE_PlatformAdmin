import {deleteTag, getTag, saveTag, updateTag} from "../repository/tag.repository";
import {Tag} from "../entity/tag.entity";
import {TagDto, toTagDto} from "../dto/tag.dto";

export const registerTag = async (tagName: string)=> {
    try {
        const tag = new Tag();
        tag.setName(tagName);
        return await saveTag(tag);
    } catch (error) {
        throw error;
    }
};

export const editTag = async (tagDto: TagDto) => {
    try {
        await updateTag(tagDto);
    } catch (error) {
        throw error;
    }
};

export const removeTag = async (id: number)=> {
    try {
        await deleteTag(id);
    } catch (error) {
        throw error;
    }
};

export const findTag = async ()=> {
    try {
        const tags: Tag[] = await getTag();
        return tags.map(toTagDto);
    } catch (error) {
        throw error;
    }
};