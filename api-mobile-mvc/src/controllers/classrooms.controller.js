import classroomDAO from "../dao/classrooms.dao.js";
import Joi from 'joi';

const classroomsController = {};

const classroomSchema = Joi.object({
    classroom_id: Joi.number().required(),
    name: Joi.string().required(),
    capacity: Joi.number().min(1).required() // Asegúrate de que la capacidad sea al menos 1
});

// Obtener todas las aulas
classroomsController.getAll = (req, res) => {
    classroomDAO.getAll()
        .then((classrooms) => {
            res.json({ data: classrooms });
        })
        .catch((error) => {
            res.json({ data: { message: error } });
        });
};

// Obtener una aula por ID
classroomsController.getOne = (req, res) => {
    classroomDAO.getOne(req.params.classroom_id)
        .then((classroom) => {
            if (classroom != null) {
                res.json({ data: classroom });
            } else {
                res.json({ data: { message: "Classroom not found" } });
            }
        })
        .catch((error) => {
            res.json({ data: { message: error } });
        });
};

// Insertar una nueva aula
classroomsController.insert = async (req, res) => {
    const { error } = classroomSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            errors: error.details.map(detail => detail.message)
        });
    }

    try {
        const existingClassroom = await classroomDAO.getOne(req.body.classroom_id);
        if (existingClassroom) {
            return res.status(400).json({
                errors: ["Classroom already exists"]
            });
        }

        const response = await classroomDAO.insert(req.body);
        res.json({
            data: {
                message: "Classroom saved",
                classroom: response
            }
        });
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        });
    }
};

// Actualizar una aula
classroomsController.updateOne = async (req, res) => {
    const { error } = classroomSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            data: { message: error.details[0].message }
        });
    }

    try {
        const result = await classroomDAO.updateOne(req.body, req.params.classroom_id);
        res.json({
            data: {
                message: "Classroom updated successfully",
                result: result
            }
        });
    } catch (error) {
        res.status(500).json({
            data: { message: error.message }
        });
    }
};

// Eliminar una aula
classroomsController.deleteOne = (req, res) => {
    classroomDAO.deleteOne(req.params.classroom_id)
        .then((classroomDeleted) => {
            res.json({
                data: {
                    message: "Classroom deleted successfully",
                    classroom_delete: classroomDeleted
                }
            });
        })
        .catch((error) => {
            res.status(500).json({ data: { message: error } });
        });
};

export default classroomsController;
