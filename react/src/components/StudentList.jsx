// src/components/StudentList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/students/getAll');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Lista de Estudiantes</h2>
            <ul data-role="listview" data-filter="true" data-filter-placeholder="Buscar estudiantes..." data-inset="true">
                {students.map((student) => (
                    <li key={student.student_id} className="collapsible">
                        <h4>{student.name}</h4>
                        <p>Matrícula: {student.student_id}</p>
                        <p>Nombre: {student.name}</p>
                        <p>Apellido: {student.lastname}</p>
                        <p>Grado: {student.grade}</p>
                        <p>Grupo: {student.group}</p>
                        <p>Promedio: {student.average}</p>
                        <div>
                            <button onClick={() => setSelectedStudent(student)} className="ui-btn ui-icon-edit ui-btn-icon-bottom">Ver Más</button>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedStudent && (
                <div className="student-details">
                    <h3>Detalles del Estudiante</h3>
                    <p>Matrícula: {selectedStudent.student_id}</p>
                    <p>Nombre: {selectedStudent.name}</p>
                    <p>Apellido: {selectedStudent.lastname}</p>
                    <p>Grado: {selectedStudent.grade}</p>
                    <p>Grupo: {selectedStudent.group}</p>
                    <p>Promedio: {selectedStudent.average}</p>
                    <button onClick={() => setSelectedStudent(null)} className="ui-btn">Cerrar</button>
                </div>
            )}
        </div>
    );
};

export default StudentList;
