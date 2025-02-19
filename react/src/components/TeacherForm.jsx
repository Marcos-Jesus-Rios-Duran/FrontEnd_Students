import React, { useState } from 'react';
import './TeacherForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TeacherForm({ onTeacherAdded }) {
    const [teacher, setTeacher] = useState({
        teacher_number: '',
        name: '',
        lastname: '',
        age: '',
        career: '',
        salary: '',
    });

    const handleChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const key in teacher) {
            if (!teacher[key].trim()) {
                toast.error(`El campo ${key.replace('_', ' ')} no puede estar vacío.`);
                return;
            }
        }

        try {
            const response = await fetch('http://192.168.1.72:3000/api/teachers/insert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teacher),
            });

            if (!response.ok) {
                const errorData = await response.json();
                errorData.data.message.forEach(message => toast.error(message));
                throw new Error('Error al agregar docente');
            }

            const newTeacher = await response.json();
            onTeacherAdded(newTeacher.data.teacher); // Agrega el nuevo docente a la lista
            toast.success('Teacher saved successfully');
            setTeacher({
                teacher_number: '',
                name: '',
                lastname: '',
                age: '',
                career: '',
                salary: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="teacher-form">
            <ToastContainer />
            <label>Numero de Docente:</label>
            <input type="number" name="teacher_number" value={teacher.teacher_number} onChange={handleChange} required />

            <label>Nombre:</label>
            <input type="text" name="name" value={teacher.name} onChange={handleChange} required />

            <label>Apellido:</label>
            <input type="text" name="lastname" value={teacher.lastname} onChange={handleChange} required />

            <label>Edad:</label>
            <input type="number" name="age" value={teacher.age} onChange={handleChange} required />

            <label>Carrera:</label>
            <input type="text" name="career" value={teacher.career} onChange={handleChange} required />

            <label>Salario:</label>
            <input type="number" name="salary" value={teacher.salary} onChange={handleChange} required />

            <button type="submit">Guardar</button>
        </form>
    );
}

export default TeacherForm;
