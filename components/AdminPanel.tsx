"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Form } from 'react-bootstrap';
import { ProductProps } from './Product';
import Image from 'next/image';
import '../src/css/media.css';
import JustValidate from 'just-validate';
import Link from 'next/link';

const AdminPanel: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState<string>('');
    const [measure, setMeasure] = useState<string>('');
    const [lastPrice, setLastPrice] = useState<string>('');
    const [currentPrice, setCurrentPrice] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');

    const [items, setItems] = useState<ProductProps[]>([]);
    const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isUpdateItemModalOpen, setIsUpdateItemModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ProductProps | null>(null);

    useEffect(() => {
        fetch('/api/upload', {
            method: 'GET',
        }).then(resp => resp.json())
            .then(resp => Array.isArray(resp) && setItems(resp));
    }, []);

    const { register, handleSubmit, reset, setValue } = useForm<ProductProps>();

    const handleAddItem = async (data: ProductProps) => {
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const newItems = await response.json();
            if (Array.isArray(newItems)) {
                setItems(newItems);
            } else {
                throw new Error('Invalid response format');
            }
            setIsAddItemModalOpen(false);
            reset();
        } catch (error) {
            console.error('Add item error:', error);
        }
    };

    const handleUpdateItem = async (dataProps: ProductProps) => {
        if (!file) return;
        console.log('It is OK, bro!');
        try {
            const data = new FormData();
            // data.set('file', dataProps.image);
            data.set('category', dataProps.category);
            data.set('currentPrice', dataProps.currentPrice + '');
            data.set('measure', dataProps.measure);
            data.set('lastPrice', dataProps.lastPrice + '');
            data.set('title', dataProps.title);
            data.set('weight', dataProps.weight);
            data.set('image', dataProps.image +'');
            data.set('description', dataProps.description);
            data.set('id', dataProps.id + '');


            const res = await fetch('/api/update', {
                method: 'POST',
                body: data
            });
            if (!res.ok) throw new Error(await res.text());
            const newItems = await res.json();
            if (Array.isArray(newItems)) {
                setItems(newItems);
            } else {
                throw new Error('Invalid response format');
            }
            setIsAddItemModalOpen(false);
            reset();
        } 
        catch (e: any) {
            console.error(e);
        }
    };

    const handleDeleteItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
        setIsDeleteConfirmModalOpen(false);
        const data = new FormData();
        data.set('id', `${id}`);
        fetch('/api/upload', {
            method: 'DELETE',
            body: data
        }).then(resp => resp.json())
            .then(resp => Array.isArray(resp) && setItems(resp));
    };

    const openAdditionalInfoModal = (item: ProductProps) => {
        setSelectedItem(item);
        setIsAdditionalInfoModalOpen(true);
    };

    const openDeleteConfirmModal = (item: ProductProps) => {
        setSelectedItem(item);
        setIsDeleteConfirmModalOpen(true);
    };

    const openUpdateItemModal = (item: ProductProps) => {
        setSelectedItem(item);
        setValue('category', item.category);
        setValue('currentPrice', item.currentPrice);
        setValue('measure', item.measure);
        setValue('lastPrice', item.lastPrice);
        setValue('title', item.title);
        setValue('weight', item.weight);
        setValue('image', item.image);
        setValue('description', item.description);
        setIsUpdateItemModalOpen(true);
        setFileName('');
    };

    useEffect(() => {
        if (isAddItemModalOpen || isUpdateItemModalOpen) {
            const formId = isAddItemModalOpen ? '#log-form-2' : '#log-form-4';
            const validator = new JustValidate(formId);

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
                        validator: (value: unknown, fields: unknown) => {
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
    }, [isAddItemModalOpen, isUpdateItemModalOpen]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            setFile(target.files[0]);
            setFileName(target.files[0].name);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;
        console.log('It is OK, bro!');
        try {
            const data = new FormData();
            data.set('file', file);
            data.set('category', category as string);
            data.set('currentPrice', currentPrice as string);
            data.set('measure', measure as string);
            data.set('lastPrice', lastPrice as string);
            data.set('title', title as string);
            data.set('weight', weight as string);
            data.set('image', image as string);
            data.set('description', description as string);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            });
            if (!res.ok) throw new Error(await res.text());
            const newItems = await res.json();
            if (Array.isArray(newItems)) {
                setItems(newItems);
            } else {
                throw new Error('Invalid response format');
            }
            setIsAddItemModalOpen(false);
            reset();
        } 
        catch (e: any) {
            console.error(e);
        }
    };

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
                            <button className="apanel__update btn-reset" onClick={() => openUpdateItemModal(item)}>
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
                    <Link href="/" legacyBehavior>
                        <a href="" className="return-link">Return</a>
                    </Link>
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
                            <p>Info: {selectedItem.description}</p>
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
                        handleDeleteItem(selectedItem?.id ?? 0);
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
                                onChange={handleFileChange}
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
                                .then(resp => Array.isArray(resp) && setItems(resp));
                        }}>
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Update Item Modal */}
            <Modal show={isUpdateItemModalOpen} onHide={() => setIsUpdateItemModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='d-flex flex-column' id="log-form-4" onSubmit={handleSubmit(handleUpdateItem)}>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Select {...register('category')} name='category' onChange={e => setCategory(e.target.value)}>
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
                                {...register('currentPrice')}
                                name='currentPrice'
                                onChange={(e) => setCurrentPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='measure'>
                            <Form.Label>Measure</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter measure'
                                {...register('measure')}
                                name='measure'
                                onChange={(e) => setMeasure(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='lastPrice'>
                            <Form.Label>Last Price</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter last price'
                                {...register('lastPrice')}
                                name='lastPrice'
                                onChange={(e) => setLastPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter title'
                                {...register('title')}
                                name='title'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='weight'>
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter weight'
                                {...register('weight')}
                                name='weight'
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                type='file'
                                name='file'
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Composition</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter composition'
                                {...register('description')}
                                name='description'
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant='primary' type='submit'>
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default AdminPanel;
