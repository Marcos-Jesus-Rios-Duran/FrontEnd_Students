import teacherDAO from "../dao/teachers.dao.js";
const teachersController ={};


teachersController.getAllT=(req,res)=>{
    teacherDAO.getAllT()
    .then((teachers)=>{
        res.json({
            data: teachers
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

teachersController.getOne=(req,res)=>{
    teacherDAO.getOne(req.params.teacher_number)
    .then((teacher)=>{
        if(teacher != null){
            res.json({
                data:teacher
            })
        }else{
            res.json({
                data:{
                    message: "Teacher not found"
                }
            })
        }
    })

}

teachersController.insert=(req, res)=>{
    teacherDAO.insert(req.body)
    .then((response)=>{
        res.json({
            data:{
                message: "Teacher saved",
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

teachersController.updateOne=(req, res)=>{
    teacherDAO.updateOne(req.body, req.params.teacher_number)
    .then((result)=>{
        res.json({
            data:{
                message: "Teacher updated succesfully",
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

teachersController.deleteOne=(req, res)=>{
    teacherDAO.deleteOne(req.params.teacher_number)
    .then((teacherDeleted)=>{
        res.json({
            data:{
                message: "Teachers deleted successfully",
                teacher_delete: teacherDeleted
            }
        })
    })
    .catch((error)=>{
        res.json({
            error: error
        })
    })
}

export default teachersController;