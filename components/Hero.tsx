"use client"

import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="container flex">
                <div className="hero_content">
                    <h1 className="hero__title">
                        Want something tasty?
                    </h1>
                    <p className="hero__info">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, sed dolores quibusdam doloremque alias veniam incidunt. Alias eaque sapiente ex incidunt quibusdam explicabo quisquam voluptas rerum, minus, similique, ullam autem.
                    </p>
                </div>
                <div className="hero__back"></div>
            </div>
        </section>
    );
};

export default Hero;