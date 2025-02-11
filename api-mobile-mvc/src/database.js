//Aqui va la conexion a la base de datos utilizando mongozee
import mongoose from "mongoose";
mongoose.connect('mongodb+srv://marcos:mrcojdr25@230733.2i5c2.mongodb.net/school_control_db?retryWrites=true&w=majority&appName=230733')
.then((db)=> console.log("Mongo DB Atlas connected"))
.catch((error)=>console.error(error));
export default mongoose;