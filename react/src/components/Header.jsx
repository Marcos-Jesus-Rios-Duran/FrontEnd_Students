// src/components/Header.jsx
import React from 'react';

const Header = () => {
    return (
        <div style={{ overflow: 'hidden' }}>
            <h1>Control escolar</h1>
            <a href="#" className="ui-btn-right">Opciones</a>
            <div className="navbar">
                <ul>
                    <li><a href="#">Alumnos</a></li>
                    <li><a href="#">Docentes</a></li>
                    <li><a href="#">Aulas</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
