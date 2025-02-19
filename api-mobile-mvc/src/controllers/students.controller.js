import studentDAO from "../dao/students.dao.js";
import Joi from 'joi';

const studentsController = {};

const studentSchema = Joi.object({
    student_id: Joi.number().required(),
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    grade: Joi.number().max(11).required(),
    group: Joi.string().required(),
    average: Joi.number().max(10).required()
});

studentsController.getAll = (req, res) => {
    studentDAO.getAll()
        .then((students) => {
            console.log(students);
            res.json({
                data: students
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error
                }
            });
        });
};

studentsController.getOne = (req, res) => {
    studentDAO.getOne(req.params.student_id)
        .then((student) => {
            if (student != null) {
                res.json({
                    data: student
                });
            } else {
                res.json({
                    data: {
                        message: "Student not found"
                    }
                });
            }
        });
};

studentsController.insert = async (req, res) => {
    const { error } = studentSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            errors: error.details.map(detail => detail.message)
        });
    }

    try {
        const existingStudent = await studentDAO.getOne(req.body.student_id);
        if (existingStudent) {
            return res.status(400).json({
                errors: ["Student already exists"]
            });
        }

        const response = await studentDAO.insert(req.body);
        res.json({
            data: {
                message: "Student saved",
                student: response
            }
        });
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        });
    }
};
studentsController.updateOne = async (req, res) => {
    const { error } = studentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            data: {
                message: error.details[0].message
            }
        });
    }

    try {
        const result = await studentDAO.updateOne(req.body, req.params.student_id);
        res.json({
            data: {
                message: "Student updated successfully",
                result: result
            }
        });
    } catch (error) {
        res.json({
            data: {
                message: error.message
            }
        });
    }
};

studentsController.deleteOne = (req, res) => {
    studentDAO.deleteOne(req.params.student_id)
        .then((studentDeleted) => {
            res.json({
                data: {
                    message: "Student deleted successfully",
                    student_delete: studentDeleted
                }
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    error: error
                }
            });
        });
};

export default studentsController;
