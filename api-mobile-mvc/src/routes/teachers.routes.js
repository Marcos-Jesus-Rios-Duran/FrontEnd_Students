import {Router} from 'express'; //solo permite de express la función de Router
import teachersController from '../controllers/teachers.controller.js';
const teachersRoutes=Router(); //realiza una constante con nombre para poder exportar el router

teachersRoutes.get('/getAll', teachersController.getAllT);
teachersRoutes.get('/getOne/:teacher_number', teachersController.getOne);
teachersRoutes.post('/insert', teachersController.insert);
teachersRoutes.put('/updateOne/:teacher_number', teachersController.updateOne);
teachersRoutes.delete('/deleteOne/:teacher_number', teachersController.deleteOne);

export default teachersRoutes;