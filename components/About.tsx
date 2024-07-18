"use client"

import React, { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import WhyWe from './AboutComponents/WhyWe';
import Contacts from './AboutComponents/Contacts';
import Location from './AboutComponents/Location';
import Assortment from './AboutComponents/Assortment';
import Swiper from 'swiper';

type AboutCategories = 'Why we?' | 'option1' | 'option2' | 'option3';

const AboutContainer = styled.section`
    .choices__inner {
        background: var(--white);
        border: 1px solid var(--black);
        border-radius: 10px;
        transition: background 0.5s ease;
    }

    .choices__list--single .choices__item {
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        color: var(--black);
    }

    .choices[data-type*=select-one]::after {
        top: 9%;
    }

    .choices__inner:hover {
        background-color: var(--light);
        transition: background-color 0.5s ease;
    }

    .choices__list--dropdown, .choices__list[aria-expanded].choices__list--dropdown, .choices__list[aria-expanded] {
        background-color: var(--white);
        border-color: var(--black);
    }

    .choices__list--dropdown .choices__item--selectable, .choices__list[aria-expanded] .choices__item--selectable {
        color: var(--black) !important;
    }

    .choices__list--dropdown .choices__item--selectable.is-highlighted, .choices__list[aria-expanded] .choices__item--selectable.is-highlighted {
        background-color: var(--light);
    }

    .choices[data-type*=select-one].is-open:after {
        top: 8%;
    }
`

const About: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<AboutCategories>('Why we?');

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value as AboutCategories);
    };

    useEffect(() => {
        const mySelect = new Choices('#my-select2', {
            shouldSort: false,
        });

    }, []);

    const renderContent = () => {
        switch (selectedOption) {
            case 'Why we?':
                return <WhyWe />;
            case 'option1':
                return <Contacts />;
            case 'option2':
                return <Location />;
            case 'option3':
                return <Assortment />;
            default:
                return null;
        }
    };

    return (
        <AboutContainer>
            <section className="about">
                <div className="container flex">
                    <div className="about__info-block">
                        <h2 className="about__title">
                            About-us
                        </h2>
                        <div className="about__select">
                            <select id="my-select2" className="my-select" value={selectedOption} onChange={handleChange}>
                                <option value="Why we?">Why we?</option>
                                <option value="option1">Contacts</option>
                                <option value="option2">Location</option>
                                <option value="option3">Assortment</option>
                            </select>
                        </div>
                    </div>
                    <div className="about__items-block">
                        {renderContent()}
                    </div>
                </div>
            </section>
        </AboutContainer>
    );
};

export default  About;