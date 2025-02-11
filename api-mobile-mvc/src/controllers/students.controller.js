import studentDAO from "../dao/students.dao.js";
const studentsController ={};


studentsController.getAll=(req,res)=>{
    studentDAO.getAll()
    .then((students)=>{
        console.log(students);
        res.json({
            data: students
        });
        //res.render('../src/views/index.ejs', {students});
    })
    .catch((error)=>{
        res.json({
            data:{
                message: error
            }
        })
    });
    
};

studentsController.getOne=(req, res)=>{
    studentDAO.getOne(req.params.student_id)
    .then((student)=>{
        if(student!=null){
            res.json({
                data: student
            })
        }else{
            res.json({
                data:{
                    message: "Student no found"
                }
            })
        }
       //res.render('../src/views/edit.ejs', {student})
    })
};

studentsController.insert=(req, res)=>{
    studentDAO.insert(req.body)
    .then((response)=>{
        res.json({
            data:{
                message: "Student saved",
                student: response
            }
        })
       res.redirect('/api/students/getAll');
    })
    .catch((error)=>{
        res.json({
            data:{
                message:error     
        }})
    })
}


studentsController.updateOne=(req, res)=>{
    studentDAO.updateOne(req.body, req.params.student_id)
    .then((result)=>{
        res.json({
            data:{
                message: "Student updated succesfully",
                result: result
            }
        })
       //res.redirect('/api/students/getAll')
    })
    .catch((error)=>{
        res.json({
            data:{
                message: error
            }
        })
    })
};


studentsController.deleteOne=(req, res)=>{
    studentDAO.deleteOne(req.params.student_id)
    .then((studentDeleted)=>{
        res.json({
            data:{
                message: "Student deleted successfully",
                student_delete: studentDeleted
            }
        })
       //res.redirect('/api/students/getAll')
    })
    .catch((error)=>{
        res.json({
            data:{
                error: error
            }
        })
    })
};

export default studentsController;