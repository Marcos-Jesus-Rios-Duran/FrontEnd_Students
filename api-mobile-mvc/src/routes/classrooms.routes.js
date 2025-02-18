import { Router } from 'express';
import classroomsController from '../controllers/classrooms.controller.js';

const classroomsRoutes = Router();

classroomsRoutes.get('/getAll', classroomsController.getAllC);
classroomsRoutes.get('/getOne/:classroom_id', classroomsController.getOne);
classroomsRoutes.post('/insert', classroomsController.insert);
classroomsRoutes.post('/updateOne/:classroom_id', classroomsController.updateOne);
classroomsRoutes.delete('/deleteOne/:classroom_id', classroomsController.deleteOne);

export default classroomsRoutes;
