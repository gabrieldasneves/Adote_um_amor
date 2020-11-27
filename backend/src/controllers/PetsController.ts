import {Request, Response} from "express";
import {getRepository} from 'typeorm';
import Pet from '../models/Pet';
import petView from '../views/pets_views';
import * as Yup from 'yup';

export default {

    async show(request:Request,response:Response) {
        const {id} = request.params;
        const petsRepository = getRepository(Pet);
        const pet = await petsRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return response.json(petView.render(pet));
    },

    async index(request:Request,response:Response) {
        const petsRepository = getRepository(Pet);
        const pets = await petsRepository.find({
            relations:['images']
        });
        return response.json(petView.renderMany(pets));
    },


    async create(request:Request,response:Response) {
        const { name,catdog,latitude,longitude,about,instructions,opening_hours,open_on_weekends} = request.body;
        const petsRepository = getRepository(Pet);
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
             return {path: image.filename}
         })

         const data = {
            name,
            catdog,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
         };

         const schema = Yup.object().shape({
             name:Yup.string().required("Nome obrigtório"),
             catdog:Yup.string(),
             latitude:Yup.number().required(),
             longitude:Yup.number().required(),
             about: Yup.string().required().max(300),
             instructions: Yup.string().required(),
             opening_hours: Yup.string().required(),
             open_on_weekends:Yup.boolean().required(),
             images: Yup.array(Yup.object().shape({
             path:Yup.string().required(),
             }),
             )
         });

         
         await schema.validate(data, {
             abortEarly: false,
         });

        const pet = petsRepository.create(data);
    
        await petsRepository.save(pet);
    
        return response.status(201).json(pet);
    
    }
}