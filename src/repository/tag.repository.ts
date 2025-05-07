import {Repository} from "typeorm";
import {Tag} from "../entity/tag.entity";
import AppDataSource from "../config/mysql.config";
import {TagDto} from "../dto/tag.dto";

const tagRepo: Repository<Tag> = AppDataSource.getRepository(Tag);

export const saveTag = async (tag: Tag) => {
    try {
        return (await tagRepo.save(tag)).id;
    } catch (error) {
        console.error('Failed to save tag:', error);
        throw new Error('Failed to save tag to database');
    }
};

export const updateTag = async (tag: TagDto) => {
    try {
        return await tagRepo.update({ id: tag.id }, { name: tag.name });
    } catch (error) {
        console.error('Failed to update tag:', error);
        throw new Error('Failed to update tag in database');
    }
};

export const deleteTag = async (id: number) => {
    try {
        return await tagRepo.delete({ id: id });
    } catch (error) {
        console.error('Failed to delete tag:', error);
        throw new Error('Failed to delete tag in database');
    }
};

export const getTag = async () => {
    try {
        return await tagRepo.find({order: {id: 'ASC'}});
    } catch (error) {
        console.error('Failed to find tag:', error);
        throw new Error('Failed to find tag in database');
    }
};