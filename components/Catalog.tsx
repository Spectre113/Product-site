"use client"

import React, { useEffect, useState, ChangeEvent } from 'react';
import Product from "./Product";
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import placeholder from '../src/img/placeholder.png';
import baz from '../src/img/bazzar.jpeg';
import chkb from '../src/img/ChickenBurger.png'
import hambur from '../src/img/Hamburger.png'
import cheesbur from '../src/img/Cheeseburger.png'
import bazzar_hit from '../src/img/BazzarHit.png'
import bbqbur from '../src/img/BBQ_Burger.png'
import bazzar_tasty from '../src/img/BazzarTasty.png'
import ces_beef from '../src/img/Quesadilla_with_beef.png'
import bur from '../src/img/Burrito_chicken.png'
import bur_meat from '../src/img/Burrito_meat.png'
import greece_salad from '../src/img/Greek_salad.png'
import cesar from '../src/img/Caesar_with_chicken.png'
import Caesar_salmon from '../src/img/Caesar_with_salmon.png'
import nophoto from '../src/img/Nophoto.png'
import jr_gyros from '../src/img/Junior_gyros.png'
import gyros_chik from '../src/img/Chicken_gyros.png'
import gyros_beef from '../src/img/Beef_gyros.png'



interface ProductProps {
    currentPrice: number;
    measure: string;
    lastPrice?: number;
    title: string;
    weight: string;
    imgSrc: string | StaticImport;
}

type ProductCategories = 'Everything' | 'option1' | 'option2' | 'option3' | 'option4' | 'option5';

const products: Record<ProductCategories, ProductProps[]> = {
    Everything: [
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'B-B-Q', weight: '30 гр.' },
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Cheesy', weight: '30 гр.' },
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Garlicky', weight: '30 гр.' },
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Sweet and sour', weight: '30 гр.' },
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Ketchup', weight: '30 гр.' },
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Maid', weight: '30 гр.' },
        { imgSrc: gyros_chik, currentPrice: 560, measure: 'руб.', title: 'Chicken gyros', weight: '440 гр.' },
        { imgSrc: gyros_beef, currentPrice: 640, measure: 'руб.', lastPrice: 900, title: 'Beef gyros', weight: '420 гр.' },
        { imgSrc: jr_gyros, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Gyros junior', weight: '30 гр.' },
        { imgSrc: Caesar_salmon, currentPrice: 420, measure: 'руб.', title: 'Caesar with salmon', weight: '160 гр.' },
        { imgSrc: cesar, currentPrice: 370, measure: 'руб.', title: 'Caesar with chicken', weight: '160 гр.' },
        { imgSrc: greece_salad, currentPrice: 300, measure: 'руб.', title: 'Greece Salad', weight: '170 гр.' },
        { imgSrc: bur_meat, currentPrice: 420, measure: 'руб.', lastPrice: 900, title: 'Buritto with meat', weight: '270 гр.' },
        { imgSrc: bur, currentPrice: 390, measure: 'руб.', lastPrice: 900, title: 'Buritto with chicken', weight: '270 гр.' },
        { imgSrc: ces_beef, currentPrice: 420, measure: 'руб.', lastPrice: 900, title: 'Quesadilla with beef', weight: '250 гр.' },{ imgSrc: chkb, currentPrice: 260, measure: 'руб.', lastPrice: 1000, title: 'Chickenburger', weight: '140 гр.' },
        { imgSrc: hambur, currentPrice: 250, measure: 'руб.', lastPrice: 1000, title: 'Hamburger', weight: '120 гр.' },
        { imgSrc: cheesbur, currentPrice: 260, measure: 'руб.', lastPrice: 1000, title: 'Cheeseburger', weight: '140 гр.' },
        { imgSrc: bazzar_hit, currentPrice: 420, measure: 'руб.', lastPrice: 1000, title: 'Bazzar Hit', weight: '220 гр.' },
        { imgSrc: bbqbur, currentPrice: 520, measure: 'руб.', lastPrice: 1000, title: 'BBQ Burger', weight: '270 гр.' },
        { imgSrc: bazzar_tasty, currentPrice: 460, measure: 'руб.', lastPrice: 1000, title: 'Bazzar Tasty', weight: '290 гр.' },

    ],
    option1: [
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'B-B-Q', weight: '30 гр.' },
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Cheesy', weight: '30 гр.' },
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Garlicky', weight: '30 гр.' },
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Sweet and sour', weight: '30 гр.' },
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Ketchup', weight: '30 гр.' },
        { imgSrc: nophoto, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Maid', weight: '30 гр.' },
    ],
    option2: [
        { imgSrc: gyros_chik, currentPrice: 560, measure: 'руб.', title: 'Chicken gyros', weight: '440 гр.' },
        { imgSrc: gyros_beef, currentPrice: 640, measure: 'руб.', lastPrice: 900, title: 'Beef gyros', weight: '420 гр.' },
        { imgSrc: jr_gyros, currentPrice: 50, measure: 'руб.', lastPrice: 1000, title: 'Gyros junior', weight: '30 гр.' },
    ],
    option3: [
        { imgSrc: Caesar_salmon, currentPrice: 420, measure: 'руб.', title: 'Caesar with salmon', weight: '160 гр.' },
        { imgSrc: cesar, currentPrice: 370, measure: 'руб.', title: 'Caesar with chicken', weight: '160 гр.' },
        { imgSrc: greece_salad, currentPrice: 300, measure: 'руб.', title: 'Greece Salad', weight: '170 гр.' }
    ],
    option4: [
        { imgSrc: bur_meat, currentPrice: 420, measure: 'руб.', lastPrice: 900, title: 'Buritto with meat', weight: '270 гр.' },
        { imgSrc: bur, currentPrice: 390, measure: 'руб.', lastPrice: 900, title: 'Buritto with chicken', weight: '270 гр.' },
        { imgSrc: ces_beef, currentPrice: 420, measure: 'руб.', lastPrice: 900, title: 'Quesadilla with beef', weight: '250 гр.' },
    ],
    option5: [
        { imgSrc: chkb, currentPrice: 260, measure: 'руб.', lastPrice: 1000, title: 'Chickenburger', weight: '140 гр.' },
        { imgSrc: hambur, currentPrice: 250, measure: 'руб.', lastPrice: 1000, title: 'Hamburger', weight: '120 гр.' },
        { imgSrc: cheesbur, currentPrice: 260, measure: 'руб.', lastPrice: 1000, title: 'Cheeseburger', weight: '140 гр.' },
        { imgSrc: bazzar_hit, currentPrice: 420, measure: 'руб.', lastPrice: 1000, title: 'Bazzar Hit', weight: '220 гр.' },
        { imgSrc: bbqbur, currentPrice: 520, measure: 'руб.', lastPrice: 1000, title: 'BBQ Burger', weight: '270 гр.' },
        { imgSrc: bazzar_tasty, currentPrice: 460, measure: 'руб.', lastPrice: 1000, title: 'Bazzar Tasty', weight: '290 гр.' },
    ]
};

const Catalog: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<ProductCategories>('Everything');

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value as ProductCategories);
    };

    useEffect(() => {
        const mySelect = new Choices('#my-select', {
            shouldSort: false,
        });
        
    }, []);

    return (
        <section className="catalog">
            <div className="container flex">
                <div className="catalog__info-block">
                    <h2 className="catalog__title">
                        Products
                    </h2>
                    <p className="catalog__info">
                        You can sort by category
                    </p>
                    <div className="catalog__select">
                        <select id="my-select" className="my-select" value={selectedOption} onChange={handleChange}>
                        <option value="Everything">Everything</option>
                        <option value="option1">Sause</option>
                        <option value="option2">Giros</option>
                        <option value="option3">Salat</option>
                        <option value="option4">Mexican</option>
                        <option value="option5">Burgers</option>
                        </select>
                    </div>
                </div>
                <div className="catalog__items-block">
                    <ul className="catalog__list list-reset row">
                        {products[selectedOption].map((product: ProductProps, index: number) => (
                                <Product
                                    key={index}
                                    imgSrc={product.imgSrc}
                                    currentPrice={product.currentPrice}
                                    measure={product.measure}
                                    lastPrice={product.lastPrice}
                                    title={product.title}
                                    weight={product.weight}
                                />
                            ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default  Catalog;