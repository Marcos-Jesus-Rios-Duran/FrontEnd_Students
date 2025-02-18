//Aquí se inicializa el server, donde es el punto de arranque de mi aplicación
import app from './app.js'; //se importa app para que tenga las funciones adecuadas
import './database.js';

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
