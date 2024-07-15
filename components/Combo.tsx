"use client"

import Image from 'next/image'

import {StaticImport} from 'next/dist/shared/lib/get-img-props'


import React from 'react';
import img from '../src/img/poke_with_crab.png'
import img_1 from '../src/img/poke_with_chiken.png'
import img_2 from '../src/img/shaurma.png'

const imgSrc: string | StaticImport = img;
const imgSrc_1: string | StaticImport = img_1;
const imgSrc_2: string | StaticImport = img_2;
const Combo: React.FC = () => {
    return (
        <section className="Combo">
            <div className="combo-section">
                <h1>Combo</h1>
                <div className="combo">
                    <div className='item'>
                        <p> Poke with crab</p>
                        <Image src={imgSrc} alt={'company logo'} width={270} height={250}
                               className='catalog_product-img'/>
                    </div>
                    <div className="plus">+</div>
                    <div className="item">
                        <p>Poke with chicken</p>
                        <Image src={imgSrc_1} alt={'company logo'} width={270} height={250}
                               className='catalog_product-img'/>
                    </div>
                    <div className="plus">+</div>
                    <div className="item">
                        <p>Shawarma classic</p>
                        <Image src={imgSrc_2} alt={'company logo'} width={270} height={250}
                               className='catalog_product-img'/>
                    </div>
                    <div className="equals">= 1300</div>
                </div>
            </div>
        </section>
    );
};

export default Combo;