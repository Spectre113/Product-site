import React, { createContext, useState, useContext, ReactNode } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { ProductProps } from './Product';

interface CartContextProps {
    cart: ProductProps[];
    addToCart: (item: ProductProps) => void;
    removeFromCart: (title: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<ProductProps[]>([]);

    const addToCart = (item: ProductProps) => {
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
