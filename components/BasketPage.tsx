"use client";

import React from 'react';
import Image from 'next/image';
import { useCart } from './Basket';
import { CartItem } from './Basket';
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

const BasketPage: React.FC = () => {
    const { cart, removeFromCart } = useCart();

    return (
        <section className="basket">
            <div className="container">
                {cart.length === 0 ? (
                    <p>Your basket is empty</p>
                ) : (
                    cart.map((item: CartItem, index: number) => (
                        <div key={index} className="basket-item flex">
                            <Image src={item.image as string} alt={item.title} width={50} height={50} />
                            <div className="basket-item-details">
                                <span className="basket-item-title">{item.title}</span>
                                <span className="basket-item-weight">{item.weight}</span>
                                <span className="basket-item-price">{item.price} {item.measure}</span>
                                <p>
                                    {item.description}
                                </p>
                            </div>
                            <button onClick={() => removeFromCart(item.title)} className="basket__del btn-reset">
                                <svg width="20" height="20" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="21" cy="21" r="19.5" stroke="#000" strokeWidth="3"></circle>
                                    <path d="M29.6777 12L12 29.6777M29.6777 29.6777L12 12" stroke="#000" strokeWidth="3"></path>
                                </svg>
                            </button>
                        </div>
                    ))
                )}
                <button className='basket__btn btn-reset'>
                    Pay
                </button>
            </div>
        </section>
    );
};

export default BasketPage;
