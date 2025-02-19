import React, { useState } from 'react';
import axios from 'axios';
import './StudentList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = ({ students, setStudents }) => {
    const [showDetails, setShowDetails] = useState({});
    const [editStudent, setEditStudent] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const toggleDetails = (studentId) => {
        setShowDetails(prev => ({ ...prev, [studentId]: !prev[studentId] }));
    };

    const handleEdit = (student) => {
        setEditStudent(student);
    };

    const handleUpdate = async () => {
        const { student_id, name, lastname, grade, group, average } = editStudent;

        if (!name.trim() || !lastname.trim() || grade === '' || group === '' || average === '') {
            toast.error('Todos los campos son obligatorios.');
            return;
        }

        // Crear un nuevo objeto sin el campo _id
        const updatedStudent = { student_id, name, lastname, grade, group, average };

        try {
            await axios.post(`http://192.168.1.72:3000/api/students/updateOne/${student_id}`, updatedStudent);
            setStudents(students.map(s => s.student_id === student_id ? updatedStudent : s));
            toast.success('Student updated successfully');
            setEditStudent(null);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.data && error.response.data.data.message) {
                toast.error(error.response.data.data.message);
            } else {
                toast.error('Error updating student');
            }
            console.log('Error updating student:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://192.168.1.72:3000/api/students/deleteOne/${confirmDelete.student_id}`);
            setStudents(students.filter(s => s.student_id !== confirmDelete.student_id));
            toast.success('Student deleted successfully');
            setConfirmDelete(null);
        } catch (error) {
            toast.error('Error deleting student');
            console.log('Error deleting student:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Estudiantes</h2>
            <ToastContainer />
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
                                    <button onClick={() => setConfirmDelete(student)} className="ui-btn ui-btn-danger">Borrar</button>
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
                        <input type="number" value={editStudent.grade} onChange={(e) => setEditStudent({ ...editStudent, grade: e.target.value })} />
                        <label>Grupo:</label>
                        <input type="text" value={editStudent.group} onChange={(e) => setEditStudent({ ...editStudent, group: e.target.value })} />
                        <label>Promedio:</label>
                        <input type="number" value={editStudent.average} onChange={(e) => setEditStudent({ ...editStudent, average: e.target.value })} />
                        
                        <div className="btn-group">
                            <button onClick={handleUpdate} className="ui-btn ui-btn-success">Guardar cambios</button>
                            <button onClick={() => setEditStudent(null)} className="ui-btn ui-btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {confirmDelete && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Confirmar Eliminación</h3>
                            <button className="close-btn" onClick={() => setConfirmDelete(null)}>✖</button>
                        </div>
                        <p id="confirm-delete-message">¿Seguro que quiere borrar al alumno <span className="highlight">{confirmDelete.name} {confirmDelete.lastname}</span>?</p>
                        <div className="btn-group">
                            <button onClick={handleDelete} className="ui-btn ui-btn-danger">Borrar</button>
                            <button onClick={() => setConfirmDelete(null)} className="ui-btn ui-btn-secondary">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;
