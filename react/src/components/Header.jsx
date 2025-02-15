import React from 'react';
import './Header.css';

const Header = ({ setView }) => {
    return (
        <header>
            <h1 id="titulo">Control Escolar</h1>
            <div className="navbar">
                <ul>
                    <li><button className="Boton" onClick={() => setView('students')}>Alumnos</button></li>
                    <li><button className="Boton" onClick={() => setView('teachers')}>Docentes</button></li>
                    <li><button className="Boton" onClick={() => setView('classrooms')}>Aulas</button></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
