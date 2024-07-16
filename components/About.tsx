"use client"


import '../src/css/style.css'

function updateText() {
    const textElement = document.getElementById('text');
    const dropdown: any = document.getElementById('dropdown');
    const selectedValue = dropdown.value;

    let textContent = '';
    switch (selectedValue) {
        case 'why':
            textContent = 'If you want to enjoy juicy burgers, a variety of rolls and the most delicious shawarma in Innopolis, then come to Bazzar Market. Taste Mexican cuisine, as well as snacks and drinks to suit every taste – and all this with convenient home delivery.';
            break;
        case 'contacts':
            textContent = 'You can reach us at: \n\nPhone: 89438452345\nTelegram: @BAZZAR_MARKET';
            break;
        case 'location':
            textContent = 'We are located at:\n\nSportivnaya 120, Innopolis, Russia';
            break;
        default:
            textContent = '';
    }
    if (textElement)
        textElement.innerText = textContent;
}

import React, {useEffect} from 'react'
const About: React.FC = () => {
    useEffect( () => {



    }, [])

    return (
        <section className="check">
            <div className="content">
                <div className="abouth" > About us</div>
                <select id="dropdown" className="dropdown" onChange={updateText}>
                    <option value="why">Why we?</option>
                    <option value="contacts">Contacts</option>
                    <option value="location">Location</option>
                </select>
                <div id="text" className="text">
                    If you want to enjoy juicy burgers, a variety of rolls and the most delicious shawarma in Innopolis,
                    then come to Bazzar Market. Taste Mexican cuisine, as well as snacks and drinks to suit every taste
                    – and all this with convenient home delivery.
                </div>
            </div>
        </section>
    );
};

export default About;