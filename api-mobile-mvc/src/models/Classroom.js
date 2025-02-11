import {model, Schema} from "mongoose";
const classroomSchema= new Schema({
    classroom_id:{
        unique: true,
        require: true,
        type: String
    },
    building: String,
    career: String,
    type: String,
    capacity: Number
},{
    versionKey: false,
    timestamps:true
});

export default model('classrooms', classroomSchema);