// src/components/StudentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

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
        try {
            const response = await axios.post('http://localhost:3000/api/students/insert', student);
            alert('Student saved successfully');
            // Reset form
            setStudent({
                student_id: '',
                name: '',
                lastname: '',
                grade: '',
                group: '',
                average: ''
            });
            onStudentAdded(response.data); // Notify parent component
        } catch (error) {
            console.error('Error saving student:', error);
            alert('Failed to save student');
        }
    };

    return (
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="txtStudentId">Matrícula</label>
            <input type="number" name="student_id" id="txtStudentId" value={student.student_id} onChange={handleChange} />
            <label htmlFor="txtStudentName">Nombre</label>
            <input type="text" name="name" id="txtStudentName" value={student.name} onChange={handleChange} />
            <label htmlFor="txtStudentLastName">Apellido</label>
            <input type="text" name="lastname" id="txtStudentLastName" value={student.lastname} onChange={handleChange} />
            <label htmlFor="txtStudentGrade">Grado</label>
            <input type="number" name="grade" id="txtStudentGrade" value={student.grade} onChange={handleChange} />
            <label htmlFor="txtStudentGroup">Grupo</label>
            <input type="text" name="group" id="txtStudentGroup" value={student.group} onChange={handleChange} />
            <label htmlFor="txtStudentAverage">Promedio</label>
            <input type="text" name="average" id="txtStudentAverage" value={student.average} onChange={handleChange} />
            <button className="ui-btn ui-btn-inline">Guardar</button>
        </form>
    );
};

export default StudentForm;
