import React, { useState } from 'react';
import './ClassroomForm.css'; // Asegúrate de tener un archivo de estilos para el formulario.

function ClassroomForm({ onClassroomAdded }) {
    const [classroom, setClassroom] = useState({
        classroom_id: '',
        building: '',
        career: '',
        type: '',
        capacity: ''
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setClassroom({ ...classroom, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.1.72:3000/api/classrooms/insert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(classroom),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.errors.join(', '));
            }

            const newClassroom = await response.json();
            onClassroomAdded(newClassroom); // Agrega la nueva aula a la lista
            setClassroom({
                classroom_id: '',
                building: '',
                career: '',
                type: '',
                capacity: '',
            });
            setErrors([]);
        } catch (error) {
            setErrors(error.message.split(', '));
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errors.length > 0 && (
                <div className="error-messages">
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <label>Identificador del Aula:</label>
            <input
                type="text"
                name="classroom_id"
                value={classroom.classroom_id}
                onChange={handleChange}
                required
            />

            <label>Edificio:</label>
            <input
                type="text"
                name="building"
                value={classroom.building}
                onChange={handleChange}
                required
            />

            <label>Carrera:</label>
            <input
                type="text"
                name="career"
                value={classroom.career}
                onChange={handleChange}
                required
            />

            <label>Tipo de Aula:</label>
            <input
                type="text"
                name="type"
                value={classroom.type}
                onChange={handleChange}
                required
            />

            <label>Capacidad:</label>
            <input
                type="number"
                name="capacity"
                value={classroom.capacity}
                onChange={handleChange}
                required
            />

            <button type="submit">Guardar</button>
        </form>
    );
}

export default ClassroomForm;
