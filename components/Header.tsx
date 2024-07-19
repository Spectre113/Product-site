"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import JustValidate from 'just-validate';
import { useRouter } from 'next/router';
import { useCart } from './Basket';

const Header: React.FC = () => {
    const router = useRouter();
    const { cart, removeFromCart } = useCart();

    useEffect(() => {
        const basketBtn = document.querySelector('.header__basket');
        const basketBlock = document.querySelector('.header__basket-block');

        const handleBasketBtnClick = (event: Event) => {
            event.stopPropagation();
            basketBlock?.classList.remove('none');
        };

        const handleDocumentClick = (event: Event) => {
            if (basketBlock && !basketBlock.contains(event.target as Node)) {
                basketBlock.classList.add('none');
            }
        };

        if (basketBtn && basketBlock) {
            if (cart.length > 0) {
                basketBtn.addEventListener('click', handleBasketBtnClick);
                document.addEventListener('click', handleDocumentClick);
            } else {
                basketBlock.classList.add('none');
            }
        }

        return () => {
            basketBtn?.removeEventListener('click', handleBasketBtnClick);
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [cart]);

    useEffect(() => {
        const search = document.querySelector('.header__search--disabled') as HTMLElement | null;
        const nav = document.querySelector('.header__nav') as HTMLElement | null;
        const searchContent = document.querySelector('.header__search-active') as HTMLElement | null;
        const content = document.querySelector('.header__controls') as HTMLElement | null;
        const close = document.querySelector('.header__search-close') as HTMLElement | null;

        if (search && nav && searchContent && content && close) {
            search.addEventListener('click', function (event) {
                event.stopPropagation();
                search.classList.add('none');
                searchContent.classList.add('block');
                nav.classList.add('none');
                content.classList.add('header__controls-active');
            });

            close.addEventListener('click', function (event) {
                event.stopPropagation();
                search.classList.remove('none');
                searchContent.classList.remove('block');
                nav.classList.remove('none');
                content.classList.remove('header__controls-active');
            });

            document.addEventListener('click', function (event) {
                if (!searchContent.contains(event.target as Node) && !search.contains(event.target as Node)) {
                    search.classList.remove('none');
                    searchContent.classList.remove('block');
                    nav.classList.remove('none');
                    content.classList.remove('header__controls-active');
                }
            });
        } else {
            console.error('One or more elements were not found.');
        }

        const logBtn = document.querySelector('.header__log');
        const logContent = document.querySelector('.header__log-content');
        const logClose = document.querySelector('.header__log-close');
        const registerBtn = document.querySelector('.header__log-register');
        const registerBlock = document.querySelector('.header__register-block');
        const registerClose = document.querySelector('.register-close');
        const registerSuccessMessage = document.querySelector('.register--successful');

        if (logBtn && logContent && logClose && registerBtn && registerBlock && registerClose && registerSuccessMessage) {
            logBtn.addEventListener('click', function(event){
                event.stopPropagation();
                logContent.classList.remove('none');
            });

            logClose.addEventListener('click', function(event) {
                event.stopPropagation();
                logContent.classList.add('none');
                registerSuccessMessage.classList.add('none');
            });

            registerBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                logContent.classList.add('none');
                registerBlock.classList.remove('none');
            });

            registerClose.addEventListener('click', function(event) {
                event.stopPropagation();
                registerBlock.classList.add('none');
            });
        } else {
            console.error('One or more elements were not found.');
        }

        const validator = new JustValidate('#log-form');

        validator
        .addField('#name', [
            {
            rule: 'required',
            errorMessage: 'You did not enter a login',
            },
            {
            rule: 'minLength',
            value: 3,
            errorMessage: '3 symbols minimum',
            },
            {
            rule: 'maxLength',
            value: 30,
            errorMessage: '30 symbols maximum',
            },
        ])
        .addField('#password', [
            {
            rule: 'required',
            errorMessage: 'You did not enter a password',
            },
            {
            rule: 'minLength',
            value: 3,
            errorMessage: '3 symbols minimum',
            },
        ])
        .onSuccess((event : Event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const name = formData.get('name') as string;
            const password = formData.get('password') as string;
    
            if (name === 'admin' && password === 'admin') {
              router.push('/apanel');
            } else {
              alert('Invalid login or password');
            }
        });

        const validator3 = new JustValidate('#log-form-3');

        validator3
        .addField('#register-name', [
            {
            rule: 'required',
            errorMessage: 'You did not enter a name',
            },
            {
            rule: 'minLength',
            value: 3,
            errorMessage: '3 symbols minimum',
            },
            {
            rule: 'maxLength',
            value: 30,
            errorMessage: '30 symbols maximum',
            },
        ])
        .addField('#register-password', [
            {
            rule: 'required',
            errorMessage: 'You did not enter a password',
            },
            {
            rule: 'minLength',
            value: 3,
            errorMessage: '3 symbols minimum',
            },
        ])
        .onSuccess((event : Event) => {
            event.stopPropagation();
            if (registerBlock && logContent && registerSuccessMessage) {
                registerBlock.classList.add('none');
                logContent.classList.remove('none');
                registerSuccessMessage.classList.remove('none');
            }
        });

        const basketBtnPage = document.querySelector('.header__basket-menu');

        if (basketBtnPage) {
            basketBtnPage.addEventListener('click', function(event) {
                event.stopPropagation();
                router.push('/basket');
            });
        }
    }, [cart, router]);

    return (
        <header className="header">
            <div className="container flex">
                <div className="header__logo">
                    <Link href="/" legacyBehavior>
                        <a href="#" className="header__logo-link">

                        </a>
                    </Link>
                </div>
                <nav className="header__nav">
                    <ul className="header__list list-reset flex">
                        <li className="header__item">
                            <Link href="/about" legacyBehavior>
                                <a href="" className="header__link">
                                    About-us
                                </a>
                            </Link>
                        </li>
                        <li className="header__item">
                            <Link href="/products" legacyBehavior>
                                <a href="" className="header__link">
                                    Products
                                </a>
                            </Link>
                        </li>
                        <li className="header__item">
                            <Link href="/combo" legacyBehavior>
                                <a href="" className="header__link">
                                    Combo 
                                </a>
                            </Link>
                        </li>
                        <li className="header__item">
                            <Link href="/news" legacyBehavior>
                                <a href="" className="header__link">
                                    Newsletter
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="header__controls flex">
                    <button className="header__search header__search--disabled btn-reset">
                        <svg width="33" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20.9999 21L16.6499 16.65" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <div className="header__search-active none">
                        <form action="https://jsonplaceholder.typicode.com/posts" method="POST" className="header__search-form flex">
                            <input type="text" className="header__search-content" placeholder="Search"></input>
                            <button className="header__search-button header__search-button-active btn-reset">
                                <svg width="33" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M20.9999 21L16.6499 16.65" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button className="header__search-close none">111</button>
                        </form>
                    </div>
                    <button className="header__log btn-reset flex">
                        <svg width="28" height="28" viewBox="0 0 19 18" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 1.5L2 5.25L9.5 9L17 5.25L9.5 1.5Z" stroke="#121723" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 12.75L9.5 16.5L17 12.75" stroke="#121723" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 9L9.5 12.75L17 9" stroke="#121723" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>
                            Log-in
                        </span>
                    </button>
                    <div className="header__log-content none flex">
                        <div>
                            <button className="header__log-close btn-reset">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="21" cy="21" r="19.5" stroke="#A1A6B4" strokeWidth="3"></circle>
                                    <path d="M29.6777 12L12 29.6777M29.6777 29.6777L12 12" stroke="#A1A6B4" strokeWidth="3"></path>
                                </svg>
                            </button>
                            <p className="header__log-info register--successful none">
                                You have successfully registered, now you may log-in:
                            </p>
                            <h2 className="header__log-title">
                                Log-in
                            </h2>
                            <p className="header__log-info">
                                If you don't have an account yet, <button className='btn-reset header__log-register'>register here</button>.
                            </p>
                            <form action="https://jsonplaceholder.typicode.com/posts" method="POST" className="header__log-form flex" id="log-form">
                                <label htmlFor="name" className="header__log-label">
                                    <input type="text" className="header__log-input" placeholder="Login" name="name" id="name"></input>
                                </label>
                                <label htmlFor="password" className="header__log-label">
                                    <input type="password" className="header__log-input" placeholder="Password" name="password" id="password"></input>
                                </label>
                                <button className="header__log-button btn-reset">
                                    Enter
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="header__register-block none flex">
                        <div>
                            <button className="register-close header__log-close btn-reset">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="21" cy="21" r="19.5" stroke="#A1A6B4" strokeWidth="3"></circle>
                                    <path d="M29.6777 12L12 29.6777M29.6777 29.6777L12 12" stroke="#A1A6B4" strokeWidth="3"></path>
                                </svg>
                            </button>
                            <h2 className="header__log-title">
                                Register
                            </h2>
                            <form action="https://jsonplaceholder.typicode.com/posts" method="POST" className="header__log-form flex" id="log-form-3">
                                <label htmlFor="name" className="header__log-label">
                                    <input type="text" className="header__log-input" placeholder="Enter a name" name="name" id="register-name"></input>
                                </label>
                                <label htmlFor="password" className="header__log-label">
                                    <input type="password" className="header__log-input" placeholder="Enter your password" name="password" id="register-password"></input>
                                </label>
                                <button className="header__log-button btn-reset">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                    <button className="header__basket btn-reset">
                        <svg fill="#fff" width="32px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.739 8.875c-0.186-0.264-0.489-0.422-0.812-0.422h-21.223l-1.607-5.54c-0.63-2.182-2.127-2.417-2.741-2.417h-4.284c-0.549 0-0.993 0.445-0.993 0.993s0.445 0.993 0.993 0.993h4.283c0.136 0 0.549 0 0.831 0.974l5.527 20.311c0.12 0.428 0.511 0.724 0.956 0.724h13.499c0.419 0 0.793-0.262 0.934-0.657l4.758-14.053c0.11-0.304 0.064-0.643-0.122-0.907zM25.47 22.506h-12.046l-3.161-12.066h19.253zM23.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5zM14.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5z"></path>
                        </svg>
                    </button>
                    <div className="header__basket-block none">
                        <div>
                            {cart.map((item, index) => (
                                <div key={index} className="basket-item flex">
                                    <span>{item.title} - {item.price} {item.measure}</span>
                                    <button onClick={() => removeFromCart(item.title)} className="delete-btn btn-reset">
                                        <svg width="20" height="20" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="21" cy="21" r="19.5" stroke="#000" strokeWidth="3"></circle>
                                            <path d="M29.6777 12L12 29.6777M29.6777 29.6777L12 12" stroke="#000" strokeWidth="3"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            <button className="header__basket-menu btn-reset">
                                Go to basket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__back"></div>
        </header>
    );
};

export default Header;