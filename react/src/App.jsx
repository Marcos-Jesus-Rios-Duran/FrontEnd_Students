import React, { useState } from 'react';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import TeacherForm from './components/TeacherForm';
import TeacherList from './components/TeacherList';
import ClassroomForm from './components/ClassroomForm';  // Agrega el formulario de aulas
import ClassroomList from './components/ClassroomList';  // Agrega la lista de aulas
import Footer from './components/Footer';
import './App.css';

function App() {
    const [view, setView] = useState('students'); // Estado para cambiar vistas
    const [classrooms, setClassrooms] = useState([]); // Estado para almacenar aulas

    // Función para agregar un aula a la lista
    const handleClassroomAdded = (newClassroom) => {
        setClassrooms([...classrooms, newClassroom]); // Agregar la nueva aula al estado
    };

    return (
        <div>
            <Header setView={setView} />
            <div className="content ui-content">
                {view === 'students' ? (
                    <>
                        <StudentForm />
                        <StudentList />
                    </>
                ) : view === 'teachers' ? (
                    <>
                        <TeacherForm />
                        <TeacherList />
                    </>
                ) : (
                    <>
                        <ClassroomForm onClassroomAdded={handleClassroomAdded} /> {/* Pasar la función */}
                        <ClassroomList classrooms={classrooms} /> {/* Pasar las aulas a la lista */}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default App;
