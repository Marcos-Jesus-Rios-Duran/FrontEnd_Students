import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClassroomList.css';

const ClassroomList = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [selectedClassroom, setSelectedClassroom] = useState(null);
    const [showDetails, setShowDetails] = useState({});
    const [editClassroom, setEditClassroom] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/classrooms/getAll');
                setClassrooms(response.data.data);
            } catch (error) {
                console.log('Error fetching classrooms:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDetails = (classroomId) => {
        setShowDetails(prev => ({ ...prev, [classroomId]: !prev[classroomId] }));
    };

    const handleEdit = (classroom) => {
        setEditClassroom(classroom);
    };

    const handleUpdate = async () => {
        try {
            await axios.post(`http://localhost:3000/api/classrooms/updateOne/${editClassroom.classroom_id}`, editClassroom);
            setClassrooms(classrooms.map(c => c.classroom_id === editClassroom.classroom_id ? editClassroom : c));
            setEditClassroom(null);
        } catch (error) {
            console.log('Error updating classroom:', error);
        }
    };

    const handleDelete = async (classroomId) => {
        try {
            await axios.delete(`http://localhost:3000/api/classrooms/deleteOne/${classroomId}`);
            setClassrooms(classrooms.filter(c => c.classroom_id !== classroomId));
        } catch (error) {
            console.log('Error deleting classroom:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Aulas</h2>
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
                                    <button onClick={() => handleDelete(classroom.classroom_id)} className="ui-btn ui-btn-danger">Borrar</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {editClassroom && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Actualizar Aula</h3>
                            <button className="close-btn" onClick={() => setEditClassroom(null)}>✖</button>
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
                            <button onClick={() => setEditClassroom(null)} className="ui-btn ui-btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassroomList;
