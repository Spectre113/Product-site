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
    const [items, setItems] = useState<Item[]>([]);
    const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const { register, handleSubmit, reset } = useForm<Item>();

    useEffect(() => {
        setItems([
            { id: 1, category: "Category 1", currentPrice: 100, measure: "g", lastPrice: 120, title: "Item 1", weight: "500g", imgSrc: "https://via.placeholder.com/150" },
            { id: 2, category: "Category 2", currentPrice: 200, measure: "g", lastPrice: 220, title: "Item 2", weight: "1000g", imgSrc: "https://via.placeholder.com/150" },
        ]);
    }, []);

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
                <Form onSubmit={handleSubmit(handleAddItem)}>
                    <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control {...register("category")} placeholder="Category" />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Current Price</Form.Label>
                    <Form.Control {...register("currentPrice", { valueAsNumber: true })} placeholder="Current Price" type="number" />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Measure</Form.Label>
                    <Form.Control {...register("measure")} placeholder="Measure" />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Last Price</Form.Label>
                    <Form.Control {...register("lastPrice", { valueAsNumber: true })} placeholder="Last Price" type="number" />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control {...register("title")} placeholder="Title" />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control {...register("weight")} placeholder="Weight" />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control {...register("imgSrc")} placeholder="Image URL" />
                    </Form.Group>
                    <Button type="submit">Add</Button>
                </Form>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default AdminPanel;