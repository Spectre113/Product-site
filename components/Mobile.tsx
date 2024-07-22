"use client"

import React from 'react';

import '../src/css/style.css'
const mobile: React.FC = () => {
    return (

        <div className="containerm">
            <header className="header">
                <h1>Responsive Design</h1>
            </header>
            <main className="main-content">
                <p>Welcome to our responsive site!</p>
            </main>
            <footer className="footerm">
                <p>&copy; 2024 Your Company</p>
            </footer>
        </div>
    );
};

export default mobile;
