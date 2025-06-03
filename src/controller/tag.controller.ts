import {Request} from 'express';
import {editTag, findTag, registerTag, removeTag} from "../service/tag.service";
import {TagDto} from "../dto/tag.dto";

export const createTagControl = async (req: Request) => {
    const tagDto: TagDto = req.body;
    if (typeof tagDto !== 'object' || tagDto === null) {
        throw new Error("Invalid request body.");
    }
    if (!tagDto.name?.trim()) {
        throw new Error("Name field is required");
    }
    if (!tagDto.nameKo?.trim()) {
        throw new Error("Name Korean field is required");
    }
    return await registerTag(tagDto);
};

export const updateTagControl = async (req: Request) => {
    const tagDto: TagDto = req.body;
    if (typeof tagDto !== 'object' || tagDto === null) {
        throw new Error("Invalid request body.");
    }
    if (tagDto.id === undefined) throw new Error("ID field is required.");
    if (!tagDto.name?.trim()) {
        throw new Error("Name field is required");
    }
    if (!tagDto.nameKo?.trim()) {
        throw new Error("Name Korean field is required");
    }
    await editTag(tagDto);
}

export const deleteTagControl = async (req: Request) => {
    const id = typeof req.body === 'object' && req.body !== null ? req.body.id : undefined;

    if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid input: 'id' field is required and must be a positive integer.");
    }

    await removeTag(id);
}

export const getTagControl = async () => {
    return await findTag();
}