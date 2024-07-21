import React, { createContext, useState, useContext, ReactNode } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface CartItem {
    title: string;
    price: number;
    measure: string;
    category?: string;
    lastPrice?: number;
    weight?: string;
    image?: string | StaticImport;
    description?: string;
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (title: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (title: string) => {
        setCart(cart.filter(item => item.title !== title));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
