//Aquí se inicializa el server, donde es el punto de arranque de mi aplicación
import app from './app.js'; //se importa app para que tenga las funciones adecuadas
import './database.js';

app.listen(app.get('port'), ()=> console.log("Server listening on port 3000 ")); //se pone el escuchador para el servidor