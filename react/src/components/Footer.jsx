// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <div style={{ overflow: 'hidden' }}>
            <h4 style={{ textAlign: 'center' }}>Redes sociales</h4>
            <div className="navbar">
                <ul>
                    <li><a href="#" data-icon="user"></a></li>
                    <li><a href="#" data-icon="heart"></a></li>
                    <li><a href="#" data-icon="mail"></a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
