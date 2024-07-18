import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CartItem {
    title: string;
    price: number;
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
