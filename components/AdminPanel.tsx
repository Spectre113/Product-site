"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Form } from 'react-bootstrap';

interface Item {
    id: number;
    category: string | undefined;
    currentPrice: number;
    measure: string;
    lastPrice: number | undefined;
    title: string;
    weight: string;
    imgSrc: string;
}

const AdminPanel: React.FC = () => {
    const [file, setFile] = useState<File>()
    const [category, setCategory] = useState<string>()
    const [measure, setMeasure] = useState<string>()
    const [lastPrice, setLastPrice] = useState<string>()
    const [currentPrice, setCurrentPrice] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [weight, setWeight] = useState<string>()
    const [image, setImage] = useState<string>()
    const [products, setProducts] = useState<any[]>([])



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return
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


            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })
            // handle the error
            if (!res.ok) throw new Error(await res.text())
            setProducts(await res.json())
        } catch (e: any) {
            // Handle errors here
            console.error(e)
        }
    }
    console.log(products)

    const [items, setItems] = useState<Item[]>([]);
    const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const { register, handleSubmit, reset } = useForm<Item>();

    const handleAddItem = (data: Item) => {
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
    };

    const openAdditionalInfoModal = (item: Item) => {
        setSelectedItem(item);
        setIsAdditionalInfoModalOpen(true);
    };

    const openDeleteConfirmModal = (item: Item) => {
        setSelectedItem(item);
        setIsDeleteConfirmModalOpen(true);
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
                <div className="add-items container">
                    <button className="add-items__button btn-reset" onClick={() => setIsAddItemModalOpen(true)}>Add Items</button>
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
                            <img src={selectedItem.imgSrc} alt={selectedItem.title} className="img-fluid" />
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
                    <Button variant="danger" onClick={() => handleDeleteItem(selectedItem?.id ?? 0)}>
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
                    <Form onSubmit={onSubmit}>
                        <input onChange={(e) => setCategory(e.target.value)} name='category' type='text' />
                        <input onChange={(e) => setCurrentPrice(e.target.value)} name='currentPrice' type='text' />
                        <input onChange={(e) => setMeasure(e.target.value)} name='measure' type='text' />
                        <input onChange={(e) => setLastPrice(e.target.value)} name='lastPrice' type='text' />
                        <input onChange={(e) => setTitle(e.target.value)} name='title' type='text' />
                        <input onChange={(e) => setWeight(e.target.value)} name='weight' type='text' />
                        <input onChange={(e) => setImage(e.target.value)} name='image' type='text' />
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => setFile(e.target.files?.[0])}
                        />
                        <Button type="submit">Add</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default AdminPanel;