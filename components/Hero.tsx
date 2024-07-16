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
                        Welcome to the ultimate fast food experience! Satisfy your cravings with our delicious and mouth-watering options. Whether it's a quick bite or a hearty meal, we've got you covered. Our menu features a variety of tasty treats, from classic burgers to irresistible fries, all made with high-quality ingredients. Enjoy fast, friendly service and indulge in the flavors you love. Come and taste the difference today!
                    </p>
                </div>
                <div className="hero__back"></div>
            </div>
        </section>
    );
};

export default Hero;