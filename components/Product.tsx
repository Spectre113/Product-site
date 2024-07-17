'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface ProductProps {
    id: number,
    category: string,
    currentPrice: number,
    measure: string,
    lastPrice: number,
    title: string,
    weight: string,
    image: string | StaticImport
}

const Product: React.FC<ProductProps> = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <li className="catalog__item col-lg-6 col-md-6 col-sm-12 col-xl-4">
            <div className='catalog__item-block' tabIndex={0} onClick={handleShow}>
                <Image src={props.image
                } alt={props.title} width={270} height={250} className='catalog_product-img' />
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
                    <button className='catalog__item-btn btn-reset' onClick={(e) => e.stopPropagation()}>
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12H20M12 4V20" stroke="#fff" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Add to basket
                    </Button>
                </Modal.Footer>
            </Modal>
        </li>
    );
}

export default Product;