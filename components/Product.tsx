'use client'

import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router';
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { useCart } from './Basket';

export interface ProductProps {
    id: number,
    category: string,
    currentPrice: number,
    measure: string,
    lastPrice: number,
    title: string,
    weight: string,
    image: string | StaticImport,
    description: string;
}

const Product: React.FC<ProductProps> = (props) => {
    const router = useRouter();
    const { addToCart } = useCart();

    const handleAddToCart = (event: React.MouseEvent) => {
        event.stopPropagation();
        addToCart({
            title: props.title,
            currentPrice: props.currentPrice,
            lastPrice: props.lastPrice,
            measure: props.measure,
            image: props.image,
            description: props.description,
            id: props.id,
            category: props.category,
            weight: props.weight
        });
    };

    const handleRedirect = () => {
        router.push(`/products/${props.id}.html`);
    };

    return (
        <li className="catalog__item col-lg-6 col-md-6 col-sm-12 col-xl-4">
            <div className='catalog__item-block' tabIndex={0} onClick={handleRedirect}>
                <Image src={props.image} alt={props.title} width={270} height={250} className='catalog_product-img' />
                <div>
                    <h3 className="catalog__item-title">
                        {props.title}
                    </h3>
                    <p className="catalog__item-price">
                        {props.currentPrice} {props.measure}
                    </p>
                    <p className="catalog__item-gramms">
                        {props.weight}
                    </p>
                    <button className='catalog__item-btn btn-reset' onClick={handleAddToCart}>
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12H20M12 4V20" stroke="#fff" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    );
}

export default Product;
