import {model, Schema} from "mongoose";
const teacherSchema= new Schema({
    teacher_number:{
        unique: true,
        require: true,
        type: Number
    },
    name: String,
    lastname: String,
    age: Number,
    career: String,
    salary: Number
},{
    versionKey: false,
    timestamps:true
});

export default model('teachers', teacherSchema);