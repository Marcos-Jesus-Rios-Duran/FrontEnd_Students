import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClassroomList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassroomList = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [showDetails, setShowDetails] = useState({});
    const [editClassroom, setEditClassroom] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.72:3000/api/classrooms/getAll');
                setClassrooms(response.data.data);
            } catch (error) {
                toast.error('Error al obtener las aulas.');
                console.error('Error fetching classrooms:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDetails = (classroomId) => {
        setShowDetails(prev => ({ ...prev, [classroomId]: !prev[classroomId] }));
    };

    const handleEdit = (classroom) => {
        setEditClassroom({ ...classroom });
    };

    const handleUpdate = async () => {
        const { classroom_id, building, career, capacity, type } = editClassroom;

        if (!building.trim() || !career.trim() || capacity === '' || type.trim() === '') {
            toast.error('Todos los campos son obligatorios.');
            return;
        }

        try {
            await axios.post(`http://192.168.1.72:3000/api/classrooms/updateOne/${classroom_id}`, editClassroom);
            setClassrooms(classrooms.map(c => c.classroom_id === classroom_id ? editClassroom : c));
            toast.success('Aula actualizada correctamente');
            setEditClassroom(null);
        } catch (error) {
            toast.error('Error al actualizar el aula');
            console.error('Error updating classroom:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://192.168.1.72:3000/api/classrooms/deleteOne/${confirmDelete.classroom_id}`);
            setClassrooms(classrooms.filter(c => c.classroom_id !== confirmDelete.classroom_id));
            toast.success('Aula eliminada correctamente');
            setConfirmDelete(null);
        } catch (error) {
            toast.error('Error al eliminar el aula');
            console.error('Error deleting classroom:', error);
        }
    };

    const closeModal = () => {
        setEditClassroom(null);
        setConfirmDelete(null);
    };

    return (
        <div>
            <h2>Lista de Aulas</h2>
            <ToastContainer />
            <ul>
                {classrooms.map((classroom) => (
                    <li key={classroom.classroom_id} className="collapsible">
                        <div className="classroom-header">
                            <h4>{classroom.building} - {classroom.type}</h4>
                            <button onClick={() => toggleDetails(classroom.classroom_id)} className="ui-btn">
                                {showDetails[classroom.classroom_id] ? 'Menos' : 'Más'}
                            </button>
                        </div>
                        {showDetails[classroom.classroom_id] && (
                            <div className="classroom-details">
                                <p>ID Aula: {classroom.classroom_id}</p>
                                <p>Carrera: {classroom.career}</p>
                                <p>Capacidad: {classroom.capacity}</p>
                                <div className="btn-group">
                                    <button onClick={() => handleEdit(classroom)} className="ui-btn ui-btn-update">Actualizar</button>
                                    <button onClick={() => setConfirmDelete(classroom)} className="ui-btn ui-btn-danger">Borrar</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {editClassroom && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Actualizar Aula</h3>
                            <button className="close-btn" onClick={closeModal}>✖</button>
                        </div>
                        <div className="form-group">
                            <label>Edificio:</label>
                            <input type="text" value={editClassroom.building} onChange={(e) => setEditClassroom({ ...editClassroom, building: e.target.value })} />
                            <label>Carrera:</label>
                            <input type="text" value={editClassroom.career} onChange={(e) => setEditClassroom({ ...editClassroom, career: e.target.value })} />
                        </div>
                        <label>Capacidad:</label>
                        <input type="number" value={editClassroom.capacity} onChange={(e) => setEditClassroom({ ...editClassroom, capacity: e.target.value })} />
                        <label>Tipo:</label>
                        <input type="text" value={editClassroom.type} onChange={(e) => setEditClassroom({ ...editClassroom, type: e.target.value })} />
                        
                        <div className="btn-group">
                            <button onClick={handleUpdate} className="ui-btn ui-btn-success">Guardar cambios</button>
                            <button onClick={closeModal} className="ui-btn ui-btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {confirmDelete && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Confirmar Eliminación</h3>
                            <button className="close-btn" onClick={closeModal}>✖</button>
                        </div>
                        <p>¿Estás seguro de que deseas eliminar el aula <strong>{confirmDelete.building} - {confirmDelete.type}</strong>?</p>
                        <div className="btn-group">
                            <button onClick={handleDelete} className="ui-btn ui-btn-danger">Sí, eliminar</button>
                            <button onClick={closeModal} className="ui-btn">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassroomList;
