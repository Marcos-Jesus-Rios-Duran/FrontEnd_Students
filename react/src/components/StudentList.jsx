import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showDetails, setShowDetails] = useState({});
    const [editStudent, setEditStudent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/students/getAll');
                setStudents(response.data.data);
            } catch (error) {
                console.log('Error fetching students:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDetails = (studentId) => {
        setShowDetails(prev => ({ ...prev, [studentId]: !prev[studentId] }));
    };

    const handleEdit = (student) => {
        setEditStudent(student);
    };

    const handleUpdate = async () => {
        try {
            await axios.post(`http://localhost:3000/api/students/updateOne/${editStudent.student_id}`, editStudent);
            setStudents(students.map(s => s.student_id === editStudent.student_id ? editStudent : s));
            setEditStudent(null);
        } catch (error) {
            console.log('Error updating student:', error);
        }
    };

    const handleDelete = async (studentId) => {
        try {
            await axios.delete(`http://localhost:3000/api/students/deleteOne/${studentId}`);
            setStudents(students.filter(s => s.student_id !== studentId));
        } catch (error) {
            console.log('Error deleting student:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Estudiantes</h2>
               <ul>
                {students.map((student) => (
                    <li key={student.student_id} className="collapsible">
                    <div className="student-header">
                        <h4>{student.name}</h4>
                        <button onClick={() => toggleDetails(student.student_id)} className="ui-btn">
                        {showDetails[student.student_id] ? 'Menos' : 'Más'}
                        </button>
                    </div>
                    {showDetails[student.student_id] && (
                        <div className="student-details">
                        <p>Matrícula: {student.student_id}</p>
                        <p>Apellido: {student.lastname}</p>
                        <p>Grado: {student.grade}</p>
                        <p>Grupo: {student.group}</p>
                        <p>Promedio: {student.average}</p>
                        <div className="btn-group">
                            <button onClick={() => handleEdit(student)} className="ui-btn ui-btn-update">Actualizar</button>
                            <button onClick={() => handleDelete(student.student_id)} className="ui-btn ui-btn-danger">Borrar</button>
                        </div>
                        </div>
                    )}
                    </li>
                ))}
                </ul>
            {editStudent && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Actualizar Estudiante</h3>
                            <button className="close-btn" onClick={() => setEditStudent(null)}>✖</button>
                        </div>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" value={editStudent.name} onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })} />
                            <label>Apellido:</label>
                            <input type="text" value={editStudent.lastname} onChange={(e) => setEditStudent({ ...editStudent, lastname: e.target.value })} />
                        </div>
                        <label>Grado:</label>
                        <input type="text" value={editStudent.grade} onChange={(e) => setEditStudent({ ...editStudent, grade: e.target.value })} />
                        <label>Grupo:</label>
                        <input type="text" value={editStudent.group} onChange={(e) => setEditStudent({ ...editStudent, group: e.target.value })} />
                        <label>Promedio:</label>
                        <input type="text" value={editStudent.average} onChange={(e) => setEditStudent({ ...editStudent, average: e.target.value })} />
                        
                        <div className="btn-group">
                            <button onClick={handleUpdate} className="ui-btn ui-btn-success">Guardar cambios</button>
                            <button onClick={() => setEditStudent(null)} className="ui-btn ui-btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;
