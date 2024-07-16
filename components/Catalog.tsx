"use client"

import React, { useEffect, useState, ChangeEvent } from 'react';
import Product from "./Product";
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import placeholder from '../src/img/placeholder.png';

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
        { imgSrc: placeholder, currentPrice: 500, measure: 'руб.', title: 'Onigiri', weight: '450 гр.' },
        { imgSrc: placeholder, currentPrice: 600, measure: 'руб.', lastPrice: 700, title: 'Sushi', weight: '300 гр.' },
        { imgSrc: placeholder, currentPrice: 700, measure: 'руб.', lastPrice: 800, title: 'Giros', weight: '400 гр.' },
        { imgSrc: placeholder, currentPrice: 400, measure: 'руб.', title: 'Salat', weight: '250 гр.' },
        { imgSrc: placeholder, currentPrice: 800, measure: 'руб.', lastPrice: 900, title: 'Mexican', weight: '500 гр.' },
        { imgSrc: placeholder, currentPrice: 900, measure: 'руб.', lastPrice: 1000, title: 'Burger', weight: '350 гр.' },
    ],
    option1: [
        { imgSrc: placeholder, currentPrice: 500, measure: 'руб.', title: 'Onigiri', weight: '450 гр.' },
        { imgSrc: placeholder, currentPrice: 600, measure: 'руб.', lastPrice: 700, title: 'Sushi', weight: '300 гр.' },
    ],
    option2: [
        { imgSrc: placeholder, currentPrice: 700, measure: 'руб.', lastPrice: 800, title: 'Giros', weight: '400 гр.' },
    ],
    option3: [
        { imgSrc: placeholder, currentPrice: 400, measure: 'руб.', title: 'Salat', weight: '250 гр.' },
    ],
    option4: [
        { imgSrc: placeholder, currentPrice: 800, measure: 'руб.', lastPrice: 900, title: 'Mexican', weight: '500 гр.' },
    ],
    option5: [
        { imgSrc: placeholder, currentPrice: 900, measure: 'руб.', lastPrice: 1000, title: 'Burger', weight: '350 гр.' },
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