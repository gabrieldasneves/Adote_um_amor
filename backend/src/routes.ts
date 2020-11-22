import {Router} from "express";
import multer from 'multer';
import PetsController from './controllers/PetsController';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/pets',upload.array('images'),PetsController.create);
routes.get('/pets', PetsController.index);
routes.get('/pets/:id', PetsController.show);


export default routes;
