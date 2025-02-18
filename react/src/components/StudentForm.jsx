import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentForm = ({ onStudentAdded }) => {
    const [student, setStudent] = useState({
        student_id: '',
        name: '',
        lastname: '',
        grade: '',
        group: '',
        average: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const key in student) {
            if (!student[key].trim()) {
                toast.error(`El campo ${key.replace('_', ' ')} no puede estar vacío.`);
                return;
            }
        }

        try {
            const response = await axios.post('http://10.10.60.28:3000/api/students/insert', student);
            toast.success('Student saved successfully');
            setStudent({
                student_id: '',
                name: '',
                lastname: '',
                grade: '',
                group: '',
                average: ''
            });
            onStudentAdded(response.data.data); // Notify parent component
        } catch (error) {
            if (error.response && error.response.data && error.response.data.data && error.response.data.data.message) {
                toast.error(error.response.data.data.message);
            } else {
                toast.error('Failed to save student');
            }
            console.error('Error saving student:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="student-form">
            <ToastContainer />
            <div>
                <label className='label' htmlFor="txtStudentId">Matrícula</label>
                <input type="number" name="student_id" id="txtStudentId" value={student.student_id} onChange={handleChange} />
            </div>
            <div>
                <label className='label' htmlFor="txtStudentName">Nombre</label>
                <input type="text" name="name" id="txtStudentName" value={student.name} onChange={handleChange} />
            </div>
            <div>
                <label className='label' htmlFor="txtStudentLastName">Apellido</label>
                <input type="text" name="lastname" id="txtStudentLastName" value={student.lastname} onChange={handleChange} />
            </div>
            <div>
                <label className='label' htmlFor="txtStudentGrade">Grado</label>
                <input type="number" name="grade" id="txtStudentGrade" value={student.grade} onChange={handleChange} />
            </div>
            <div>
                <label className='label' htmlFor="txtStudentGroup">Grupo</label>
                <input type="text" name="group" id="txtStudentGroup" value={student.group} onChange={handleChange} />
            </div>
            <div>
                <label className='label' htmlFor="txtStudentAverage">Promedio</label>
                <input type="text" name="average" id="txtStudentAverage" value={student.average} onChange={handleChange} />
            </div>
            <button className="ui-btn ui-btn-inline">Guardar</button>
        </form>
    );
};

export default StudentForm;
