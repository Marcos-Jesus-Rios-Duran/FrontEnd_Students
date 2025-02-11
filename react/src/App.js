import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>List of Students</h1>
            <ul>
                {students.map(student => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
