import {Request, Response} from "express";
import {getRepository} from 'typeorm';
import Pet from '../models/Pet';

export default {

    async show(request:Request,response:Response) {
        const {id} = request.params;
        const petsRepository = getRepository(Pet);
        const pet = await petsRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return response.json(pet);
    },

    async index(request:Request,response:Response) {
        const petsRepository = getRepository(Pet);
        const pets = await petsRepository.find({
            relations:['images']
        });
        return response.json(pets);
    },


    async create(request:Request,response:Response) {
        const { name,catdog,latitude,longitude,about,instructions,opening_hours,open_on_weekends} = request.body;
        const petsRepository = getRepository(Pet);
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
             return {path: image.filename}
         })
        const pet = petsRepository.create({
            name,
            catdog,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'false',
            images
            
        });
    
        await petsRepository.save(pet);
    
        return response.status(201).json(pet);
    
    }
}