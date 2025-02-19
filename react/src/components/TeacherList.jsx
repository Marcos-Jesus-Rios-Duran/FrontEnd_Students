import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeacherList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [showDetails, setShowDetails] = useState({});
    const [editTeacher, setEditTeacher] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.72:3000/api/teachers/getAll');
                setTeachers(response.data.data);
            } catch (error) {
                console.log('Error fetching teachers:', error);
                toast.error('Error al obtener la lista de docentes');
            }
        };
        fetchData();
    }, []);

    const toggleDetails = (teacherNumber) => {
        setShowDetails(prev => ({ ...prev, [teacherNumber]: !prev[teacherNumber] }));
    };

    const handleEdit = (teacher) => {
        setEditTeacher(teacher);
    };

    const handleUpdate = async () => {
        if (!editTeacher.name.trim() || !editTeacher.lastname.trim() || editTeacher.age === '' || editTeacher.career.trim() === '' || editTeacher.salary === '') {
            toast.error('Todos los campos son obligatorios.');
            return;
        }
        try {
            await axios.post(`http://192.168.1.72:3000/api/teachers/updateOne/${editTeacher.teacher_number}`, editTeacher);
            setTeachers(teachers.map(t => t.teacher_number === editTeacher.teacher_number ? editTeacher : t));
            toast.success('Docente actualizado exitosamente');
            setEditTeacher(null);
        } catch (error) {
            toast.error('Error al actualizar el docente');
            console.log('Error updating teacher:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://192.168.1.72:3000/api/teachers/deleteOne/${confirmDelete.teacher_number}`);
            setTeachers(teachers.filter(t => t.teacher_number !== confirmDelete.teacher_number));
            toast.success('Docente eliminado exitosamente');
            setConfirmDelete(null);
        } catch (error) {
            toast.error('Error al eliminar el docente');
            console.log('Error deleting teacher:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Docentes</h2>
            <ToastContainer />
            <ul>
                {teachers.map((teacher) => (
                    <li key={teacher.teacher_number} className="collapsible">
                        <div className="teacher-header">
                            <h4>{teacher.name}</h4>
                            <button onClick={() => toggleDetails(teacher.teacher_number)} className="ui-btn">
                                {showDetails[teacher.teacher_number] ? 'Menos' : 'Más'}
                            </button>
                        </div>
                        {showDetails[teacher.teacher_number] && (
                            <div className="teacher-details">
                                <p>Num. Docente: {teacher.teacher_number}</p>
                                <p>Apellido: {teacher.lastname}</p>
                                <p>Edad: {teacher.age}</p>
                                <p>Carrera: {teacher.career}</p>
                                <p>Salario: {teacher.salary}</p>
                                <div className="btn-group">
                                    <button onClick={() => handleEdit(teacher)} className="ui-btn ui-btn-update">Actualizar</button>
                                    <button onClick={() => setConfirmDelete(teacher)} className="ui-btn ui-btn-danger">Borrar</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {editTeacher && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Actualizar Docente</h3>
                            <button className="close-btn" onClick={() => setEditTeacher(null)}>✖</button>
                        </div>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" value={editTeacher.name} onChange={(e) => setEditTeacher({ ...editTeacher, name: e.target.value })} />
                            <label>Apellido:</label>
                            <input type="text" value={editTeacher.lastname} onChange={(e) => setEditTeacher({ ...editTeacher, lastname: e.target.value })} />
                            <label>Edad:</label>
                            <input type="number" value={editTeacher.age} onChange={(e) => setEditTeacher({ ...editTeacher, age: e.target.value })} />
                            <label>Carrera:</label>
                            <input type="text" value={editTeacher.career} onChange={(e) => setEditTeacher({ ...editTeacher, career: e.target.value })} />
                            <label>Salario:</label>
                            <input type="number" value={editTeacher.salary} onChange={(e) => setEditTeacher({ ...editTeacher, salary: e.target.value })} />
                        </div>
                        <div className="btn-group">
                            <button onClick={handleUpdate} className="ui-btn ui-btn-success">Guardar cambios</button>
                            <button onClick={() => setEditTeacher(null)} className="ui-btn ui-btn-danger">Cancelar</button>
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
                        <p id="confirm-delete-message">¿Seguro que quiere borrar al docente <span className="highlight">{confirmDelete.name} {confirmDelete.lastname}</span>?</p>
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

export default TeacherList;
