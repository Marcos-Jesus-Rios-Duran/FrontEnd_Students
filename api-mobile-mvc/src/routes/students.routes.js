import {Router} from 'express'; //solo permite de express la función de Router
import studentsController from '../controllers/students.controller.js';
const studentsRoutes=Router(); //realiza una constante con nombre para poder exportar el router

studentsRoutes.get('/getAll', studentsController.getAll);
studentsRoutes.get('/getOne/:student_id', studentsController.getOne);
studentsRoutes.post('/insert', studentsController.insert);
studentsRoutes.post('/updateOne/:student_id', studentsController.updateOne);
studentsRoutes.delete('/deleteOne/:student_id', studentsController.deleteOne);

export default studentsRoutes; 