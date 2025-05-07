import {Request} from 'express';
import {editTag, findTag, registerTag, removeTag} from "../service/tag.service";
import {TagDto} from "../dto/tag.dto";

export const createTagControl = async (req: Request) => {
    try {
        const tagName = req.body;
        if (tagName === undefined) throw new Error("Name field is required");
        return await registerTag(tagName);
    } catch (error) {
        throw error;
    }
};

export const updateTagControl = async (req: Request) => {
    try {
        const tagDto: TagDto = req.body;
        if (tagDto.id === undefined) throw new Error("ID field is required.");
        if (tagDto.name === undefined) throw new Error("Name field is required.");
        await editTag(tagDto);
    } catch (error) {
        throw error;
    }
}

export const deleteTagControl = async (req: Request) => {
    try {
        const id = req.body;
        if (id === undefined) throw new Error("ID field is required.");
        await removeTag(id);
    } catch (error) {
        throw error;
    }
}

export const getTagControl = async () => {
    try {
        return await findTag();
    } catch (error) {
        throw error;
    }
}