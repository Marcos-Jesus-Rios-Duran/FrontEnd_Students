import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header>
            <h1 id="titulo">Control Escolar</h1>
            <div className="navbar">
                <ul>
                    <li><a className="Boton" href="#">Alumnos</a></li>
                    <li><a className="Boton" href="#">Docentes</a></li>
                    <li><a className="Boton" href="#">Aulas</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
