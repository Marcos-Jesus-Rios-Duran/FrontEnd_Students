//Aquí lleva la config del servidor desde los settings, middlewaers, routes
import express from 'express'; //se importa la función express  para que se utilice express es framework de entorno de trabajo más conocida en Node.js que permite estructurar una aplicación de una manera ágil, nos proporciona funcionalidades como el enrutamiento, opciones para gestionar sesiones y cookies, etc.
import morgan from 'morgan'; //es para usar morgan que es un control de bitacora que registra las peticiones
import ejs from 'ejs'; 
import studentsRoutes from './routes/students.routes.js'; //para poder importar el router de los  estudiantes
import teachersRoutes from './routes/teachers.routes.js';
import classroomsRoutes from './routes/classrooms.routes.js';
const app = express(); //para usar express instanciamos un hijo de express 
import cors from 'cors'
//Middlewares es un software que permite la comunicación entre aplicaciones, sistemas operativos y bases de datos.
app.use(express.json()); //para que la aplicación entienda json
app.use(express.urlencoded({extended: true})); //para que se lea los formularios 
app.use(morgan('dev')); //para que se asigne la bitacora cada que tenga una petición el servidor

// Configura CORS para permitir solicitudes desde 'http://localhost:5173'
app.use(cors());

//Settings
app.set('view engine', ejs);
app.set('port', process.env.PORT||3000); //se asigna el puerto 3000 para alzar el servidor

//Routes
app.use("/api/teachers", teachersRoutes)
app.use("/api/students", studentsRoutes); //se utiliza el prefijo para identificar al abrir las rutas y busca una ruta desde app.js
app.use("/api/classrooms", classroomsRoutes);

export default app; // se exporta la app para que el index levante el server