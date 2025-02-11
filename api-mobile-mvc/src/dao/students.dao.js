import Student from '../models/Student.js'
const studentDAO={};

studentDAO.getAll=async()=>{
    return await Student.find();
};

studentDAO.getOne=async(student_id)=>{
    return await Student.findOne({student_id: student_id});
};

studentDAO.insert=async(student)=>{
    return await Student.create(student);
};

studentDAO.updateOne=async(students, student_id)=>{
    return await Student.findOneAndUpdate({student_id: student_id}, students);
};

studentDAO.deleteOne=async(student_id)=>{
    return await Student.findOneAndDelete({student_id: student_id});
}

export default studentDAO;