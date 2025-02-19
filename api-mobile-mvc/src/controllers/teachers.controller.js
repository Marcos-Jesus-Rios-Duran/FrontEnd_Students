import teacherDAO from "../dao/teachers.dao.js";
import Joi from "joi";

const teachersController = {};

const teacherSchema = Joi.object({
    teacher_number: Joi.number().required(),
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    age: Joi.number().min(18).required(),
    career: Joi.string().required(),
    salary: Joi.number().min(0).required()
});

// Obtener todos los docentes
teachersController.getAll = (req, res) => {
    teacherDAO.getAll()
        .then((teachers) => res.json({ data: teachers }))
        .catch((error) => res.status(500).json({ error: error.message }));
};

// Obtener un docente por número
teachersController.getOne = (req, res) => {
    teacherDAO.getOne(req.params.teacher_number)
        .then((teacher) => {
            if (teacher) {
                res.json({ data: teacher });
            } else {
                res.status(404).json({ data: { message: "Teacher not found" } });
            }
        })
        .catch((error) => res.status(500).json({ error: error.message }));
};

// Insertar un nuevo docente
teachersController.insert = async (req, res) => {
    const { error } = teacherSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            errors: error.details.map(detail => detail.message)
        });
    }

    try {
        const existingTeacher = await teacherDAO.getOne(req.body.teacher_number);
        if (existingTeacher) {
            return res.status(400).json({
                errors: ["Teacher already exists"]
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
            errors: [error.message]
        });
    }
};

// Actualizar un docente
teachersController.updateOne = async (req, res) => {
    const { error } = teacherSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            errors: error.details.map(detail => detail.message)
        });
    }

    try {
        const existingTeacher = await teacherDAO.getOne(req.params.teacher_number);
        if (!existingTeacher) {
            return res.status(404).json({
                errors: ["Teacher not found"]
            });
        }

        const result = await teacherDAO.updateOne(req.body, req.params.teacher_number);
        res.json({
            data: {
                message: "Teacher updated successfully",
                result: result
            }
        });
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        });
    }
};

// Eliminar un docente
teachersController.deleteOne = async (req, res) => {
    try {
        const existingTeacher = await teacherDAO.getOne(req.params.teacher_number);
        if (!existingTeacher) {
            return res.status(404).json({
                errors: ["Teacher not found"]
            });
        }

        await teacherDAO.deleteOne(req.params.teacher_number);
        res.json({
            data: {
                message: "Teacher deleted successfully"
            }
        });
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        });
    }
};

export default teachersController;
