import classroomDAO from "../dao/classrooms.dao.js";
import teacherDAO from "../dao/teachers.dao.js";
const classroomsController ={};


classroomsController.getAllC=(req,res)=>{
    classroomDAO.getAllC()
    .then((classrooms)=>{
        res.json({
            data: classrooms
        });
    })
    .catch((error)=>{
        res.json({
            data:{
                message: error
            }
        })
    });
    
};

classroomsController.getOne=(req,res)=>{
    classroomDAO.getOne(req.params.classroom_id)
    .then((classroom)=>{
        if(classroom!=null){
            res.json({
                data:classroom
            })
        }else{
            res.json({
                data:{
                    message: "Classroom not found"
                }
            })
        }
    })
}

classroomsController.insert=(req, res)=>{
    teacherDAO.insert(req.body)
    .then((response)=>{
        res.json({
            data:{
                message: "Classroom saved",
                student: response
            }
        })
    })
    .catch((error)=>{
        res.json({
            data:{
                message:error     
        }})
    })
}

classroomsController.updateOne=(req, res)=>{
    classroomDAO.updateOne(req.body, req.params.classroom_id)
    .then((result)=>{
        res.json({
            data:{
                message: "Classroom updated succesfully",
                result: result
            }
        })
    })
    .catch((error)=>{
        res.json({
            data:{
                message: error
            }
        })
    })
};

classroomsController.deleteOne=(req, res)=>{
    classroomDAO.deleteOne(req.params.classroom_id)
    .then((classroomDeleted)=>{
        res.json({
            data:{
                message: "Classroom deleted successfully",
                classroom_delete: classroomDeleted
            }
        })
    })
    .catch((error)=>{
        res.json({
            data:{
                error:error
            }
        })
    })
}
export default classroomsController;