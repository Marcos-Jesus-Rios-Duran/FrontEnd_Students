import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header>
            <h1 id="titulo">Control Escolar</h1>
            <div className="navbar">
                <ul>
                    <li><a class="Boton" href="#">Alumnos</a></li>
                    <li><a class="Boton" href="#">Docentes</a></li>
                    <li><a class="Boton" href="#">Aulas</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
