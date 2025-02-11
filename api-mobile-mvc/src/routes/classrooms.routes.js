import {Router} from 'express'; //solo permite de express la función de Router
import classroomsController from '../controllers/classrooms.controller.js';
const classroomsRoutes=Router(); //realiza una constante con nombre para poder exportar el router

classroomsRoutes.get('/getAll', classroomsController.getAllC);
classroomsRoutes.get('/getOne/:classroom_id', classroomsController.getOne);
classroomsRoutes.post('/insert', classroomsController.insert)
classroomsRoutes.put('/updateOne/:classroom_id', classroomsController.updateOne);
classroomsRoutes.delete('/deleteOne/:classroom_id', classroomsController.deleteOne)

export default classroomsRoutes;