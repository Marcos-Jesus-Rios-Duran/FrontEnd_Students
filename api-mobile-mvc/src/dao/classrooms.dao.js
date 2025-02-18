import Classroom from '../models/Classroom.js';

const classroomDAO = {};

classroomDAO.getAllC = async () => {
    return await Classroom.find();
};

classroomDAO.getOne = async (classroom_id) => {
    return await Classroom.findOne({ classroom_id: classroom_id });
};

classroomDAO.insert = async (classroom) => {
    return await Classroom.create(classroom);
};

classroomDAO.updateOne = async (classroom, classroom_id) => {
    return await Classroom.findOneAndUpdate(
        { classroom_id: classroom_id }, 
        classroom, 
        { new: true }
    );
};

classroomDAO.deleteOne = async (classroom_id) => {
    return await Classroom.findOneAndDelete({ classroom_id: classroom_id });
};

export default classroomDAO;
