import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import TeacherForm from './components/TeacherForm';
import TeacherList from './components/TeacherList';
import ClassroomForm from './components/ClassroomForm';
import ClassroomList from './components/ClassroomList';
import Footer from './components/Footer';
import axios from 'axios';
import './App.css';

function App() {
    const [view, setView] = useState('students');
    const [students, setStudents] = useState([]);
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://10.10.60.28:3000/api/students/getAll');
                setStudents(response.data.data);
            } catch (error) {
                console.log('Error fetching students:', error);
            }
        };
        fetchData();
    }, []);

    const handleClassroomAdded = (newClassroom) => {
        setClassrooms([...classrooms, newClassroom]);
    };

    const handleStudentAdded = (newStudent) => {
        setStudents([...students, newStudent]);
    };

    return (
        <div>
            <Header setView={setView} />
            <div className="content ui-content">
                {view === 'students' ? (
                    <>
                        <StudentForm onStudentAdded={handleStudentAdded} />
                        <StudentList students={students} setStudents={setStudents} />
                    </>
                ) : view === 'teachers' ? (
                    <>
                        <TeacherForm />
                        <TeacherList />
                    </>
                ) : (
                    <>
                        <ClassroomForm onClassroomAdded={handleClassroomAdded} />
                        <ClassroomList classrooms={classrooms} />
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default App;
