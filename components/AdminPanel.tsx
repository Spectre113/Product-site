"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Form } from 'react-bootstrap';
import { ProductProps } from './Product';
import Image from 'next/image';
import styled from 'styled-components';
import Image from 'next/image';
import JustValidate from 'just-validate';
import {ProductProps} from './Product';

const AdminPanel: React.FC = () => {
    const [file, setFile] = useState<File>()
    const [category, setCategory] = useState<string>()
    const [measure, setMeasure] = useState<string>()
    const [lastPrice, setLastPrice] = useState<string>()
    const [currentPrice, setCurrentPrice] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [weight, setWeight] = useState<string>()
    const [image, setImage] = useState<string>()
    const [products, setProducts] = useState<ProductProps[]>([])
    const [description, setDescription] = useState<string>()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return
        console.log('It is OK, bro!');
        try {
            const data = new FormData()
            data.set('file', file)
            data.set('category', category as string)
            data.set('currentPrice', currentPrice as string)
            data.set('measure', measure as string)
            data.set('lastPrice', lastPrice as string)
            data.set('title', title as string)
            data.set('weight', weight as string)
            data.set('image', image as string)
            data.set('description', description as string)


            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })
            if (!res.ok) throw new Error(await res.text())
            setProducts(await res.json())
        } 
        catch (e: any) {
            console.error(e)
        }
    }

    const [items, setItems] = useState<ProductProps[]>([]);
    const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ProductProps | null>(null);
    useEffect(() => {
        fetch('/api/upload', {
            method: 'GET',
        }).then(resp => resp.json())
            .then(resp => setItems(resp))
    }, [])

    const { register, handleSubmit, reset } = useForm<ProductProps>();

    const handleAddItem = (data: ProductProps) => {
        const newItem = { ...data, id: items.length + 1 };
        setItems([...items, newItem]);
        setIsAddItemModalOpen(false);
        reset();
    };

    const handleUpdateItem = (id: number) => {
        setItems(items.map(item => item.id === id ? { ...item, title: `${item.title} (updated)` } : item));
    };

    const handleDeleteItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
        setIsDeleteConfirmModalOpen(false);
        const data = new FormData()
        data.set('id', `${id}`)
        fetch('/api/upload', {
            method: 'DELETE',
            body: data
        }).then(resp => resp.json())
            .then(resp => {
                setItems(resp)
            })
    };

    const openAdditionalInfoModal = (item: ProductProps) => {
        setSelectedItem(item);
        setIsAdditionalInfoModalOpen(true);
    };

    const openDeleteConfirmModal = (item: ProductProps) => {
        setSelectedItem(item);
        setIsDeleteConfirmModalOpen(true);
    };

    useEffect(() => {
        if (isAddItemModalOpen) {
            const validator = new JustValidate('#log-form-2');

            validator
                .addField('#category', [
                    {
                        rule: 'required',
                        errorMessage: 'You did not select a category',
                    },
                ])
                .addField('#curPrice', [
                    {
                        rule: 'required',
                        errorMessage: 'You did not enter a current price',
                    },
                ])
                .addField('#measure', [
                    {
                        rule: 'required',
                        errorMessage: 'You did not enter a measure',
                    },
                ])
                .addField('#lastPrice', [
                    {
                        rule: 'required',
                        errorMessage: 'You did not enter a last price',
                    },
                ])
                .addField('#title', [
                    {
                        rule: 'required',
                        errorMessage: 'You did not enter a title',
                    },
                ])
                .addField('#weight', [
                    {
                        rule: 'required',
                        errorMessage: 'You did not enter a weight',
                    },
                ])
                .addField('#description', [
                    {
                        rule: 'required',
                        errorMessage: 'You did not enter a composition',
                    },
                ])
                .addField('#image', [
                    {
                        rule: 'required',
                        errorMessage: 'You did not select a file',
                    },
                    {
                        validator: (value : unknown, fields : unknown) => {
                            const fileInput = document.querySelector<HTMLInputElement>('#image');
                            return fileInput && fileInput.files && fileInput.files.length > 0;
                        },
                        errorMessage: 'You did not select a file',
                    },
                ])
                .onSuccess((e: Event) => {
                    onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                });
        }
    }, [isAddItemModalOpen]);

    return (
        <section className="apanel">
            <div className="apanel-container">
                {items.map(item => (
                    <div key={item.id} className="apanel-row">
                        <div className="container flex">
                            <p className="apanel__id">
                                {item.id}
                            </p>
                            <p className="apanel__name">
                                {item.title}
                            </p>
                            <p className="apanel__category">
                                {item.category}
                            </p>
                            <button className="apanel__additional btn-reset" onClick={() => openAdditionalInfoModal(item)}>
                                Show Additional Info
                            </button>
                            <button className="apanel__update btn-reset" disabled onClick={() => handleUpdateItem(item.id)}>
                                Update Info
                            </button>
                            <button className="apanel__delete btn-reset" onClick={() => openDeleteConfirmModal(item)}>
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="21" cy="21" r="19.5" stroke="#fff" strokeWidth="3"></circle>
                                    <path d="M29.6777 12L12 29.6777M29.6777 29.6777L12 12" stroke="#fff" strokeWidth="3"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
                <div className="add-items container flex">
                    <button className="add-items__button btn-reset" onClick={() => setIsAddItemModalOpen(true)}>Add Items</button>
                    <a href="/" className="return-link">Return</a>
                </div>
            </div>

            {/* Additional Info Modal */}
            <Modal show={isAdditionalInfoModalOpen} onHide={() => setIsAdditionalInfoModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Additional Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem && (
                        <div>
                            <Image unoptimized={true} src={selectedItem.image} alt={selectedItem.title} className="img-fluid" width={100} height={100}/>
                            <p>Category: {selectedItem.category}</p>
                            <p>Current Price: {selectedItem.currentPrice}</p>
                            <p>Measure: {selectedItem.measure}</p>
                            <p>Last Price: {selectedItem.lastPrice}</p>
                            <p>Weight: {selectedItem.weight}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsAdditionalInfoModalOpen(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirm Modal */}
            <Modal show={isDeleteConfirmModalOpen} onHide={() => setIsDeleteConfirmModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this item?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleDeleteItem(selectedItem?.id ?? 0)
                    }}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={() => setIsDeleteConfirmModalOpen(false)}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Item Modal */}
            <Modal show={isAddItemModalOpen} onHide={() => setIsAddItemModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className='d-flex flex-column' id="log-form-2" onSubmit={onSubmit}>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={(e) => setCategory(e.target.value)} name='category'>
                                <option value='Sause'>Sause</option>
                                <option value='Giros'>Giros</option>
                                <option value='Salat'>Salat</option>
                                <option value='Mexican'>Mexican</option>
                                <option value='Burgers'>Burgers</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='curPrice'>
                            <Form.Label>Current Price</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter current price'
                                onChange={(e) => setCurrentPrice(e.target.value)}
                                name='currentPrice'
                            />
                        </Form.Group>

                        <Form.Group controlId='measure'>
                            <Form.Label>Measure</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter measure'
                                onChange={(e) => setMeasure(e.target.value)}
                                name='measure'
                            />
                        </Form.Group>

                        <Form.Group controlId='lastPrice'>
                            <Form.Label>Last Price</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter last price'
                                onChange={(e) => setLastPrice(e.target.value)}
                                name='lastPrice'
                            />
                        </Form.Group>

                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter title'
                                onChange={(e) => setTitle(e.target.value)}
                                name='title'
                            />
                        </Form.Group>

                        <Form.Group controlId='weight'>
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter weight'
                                onChange={(e) => setWeight(e.target.value)}
                                name='weight'
                            />
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                type='file'
                                name='file'
                                onChange={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    if (target.files) {
                                        setFile(target.files[0]);
                                    }
                                }}
                            />
                        </Form.Group>
                  
                        <Form.Group controlId='description'>
                            <Form.Label>Сomposition</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter composition'
                                onChange={(e) => setDescription(e.target.value)}
                                name='composition'
                            />
                        </Form.Group>
                  
                        <Button variant='primary' type='submit' onClick={() => {
                            fetch('/api/upload', {
                                method: 'GET',
                            }).then(resp => resp.json())
                                .then(resp => {
                                    setItems(resp)
                                })
                        }}>
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default AdminPanel;