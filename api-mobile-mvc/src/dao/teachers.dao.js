import Teacher from '../models/Teacher.js'
const teacherDAO={};

teacherDAO.getAllT=async()=>{
    return await Teacher.find();
};

teacherDAO.getOne=async(teacher_number)=>{
    return await Teacher.findOne({teacher_number: teacher_number})
};

teacherDAO.insert=async(teacher)=>{
    return await Teacher.create(teacher);
};

teacherDAO.updateOne=async(teacher, teacher_number)=>{
    return await Teacher.findOneAndUpdate({teacher_number: teacher_number}, teacher)
}

teacherDAO.deleteOne=async(teacher_number)=>{
    return await Teacher.findOneAndDelete({teacher_number:teacher_number})
}

export default teacherDAO;