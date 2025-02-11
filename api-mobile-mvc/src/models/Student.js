
import {model, Schema} from "mongoose";
const studentSchema= new Schema({
    student_id:{
        unique: true,
        require: true,
        type: Number
    },
    name: String,
    lastname: String,
    grade: Number,
    group: String,
    average: Number
},{
    versionKey: false,
    timestamps:true
});

export default model('students', studentSchema);