import Joi from "joi";
import teacherDAO from "../dao/teachers.dao.js";
const teachersController ={};

const teacherSchema = Joi.object({
    teacher_number: Joi.number().required(),
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    age: Joi.number().min(18).required(),  // Asegurarse de que la edad sea mayor o igual a 18
    career: Joi.string().required(),
    salary: Joi.number().min(0).required() // Asegurarse de que el salario no sea negativo
});

teachersController.getAllT = (req, res) => {
    teacherDAO.getAllT()
        .then((teachers) => {
            // Envuelve el array de docentes dentro de la propiedad 'data'
            res.json({ data: teachers });
        })
        .catch((error) => {
            // En caso de error, devuelves un objeto con la propiedad 'data' y el mensaje de error
            res.json({ data: { message: error } });
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

teachersController.insert = async (req, res) => {
    const { error } = teacherSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            data: {
                message: error.details.map(detail => detail.message)
            }
        });
    }

    try {
        const existingTeacher = await teacherDAO.getOne(req.body.teacher_number);
        if (existingTeacher) {
            return res.status(400).json({
                data: {
                    message: ["Teacher already exists"]
                }
            });
        }

        const response = await teacherDAO.insert(req.body);
        res.json({
            data: {
                message: "Teacher saved",
                teacher: response
            }
        });
    } catch (error) {
        res.status(500).json({
            data: {
                message: [error.message]
            }
        });
    }
};

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
