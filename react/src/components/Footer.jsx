import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <h4 id="titulo">Síguenos en nuestras redes sociales</h4>
            <div className="navbar">
                <ul>
                    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="facebook">Facebook</a></li>
                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="instagram">Instagram</a></li>
                    <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="twitter">X </a></li>
                    <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="linkedin">LinkedIn</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
