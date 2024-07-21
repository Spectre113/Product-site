import React from 'react';
import { GetServerSideProps } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProductProps } from '@/components/Product';
import { useCart } from '@/components/Basket';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import '../../src/css/states.css';
import '../../src/css/media.css';
import '../../src/css/style.css';

const ProductPage: React.FC<ProductProps> = (product: ProductProps) => {
    const router = useRouter();
    const { addToCart } = useCart();

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = (event: React.MouseEvent) => {
        event.stopPropagation();
        addToCart({
            title: product.title,
            currentPrice: product.currentPrice,
            lastPrice: product.lastPrice,
            measure: product.measure,
            image: product.image,
            description: product.description,
            id: product.id,
            category: product.category,
            weight: product.weight
        });
        alert('Product added to basket');
    };

    const handleReturn = () => {
        router.push('/products');
    };

    return (
        <div>
            <Header />
            <section className="item">
                <div className="container">
                    <h2 className='item__title'>{product.title}</h2>
                    <div className='item__block flex'>
                        <img className='item__img' src={product.image as string} alt={product.title} width="270" height="250" />
                        <div className='item__info-block'>
                            <p className='item__info'>Category: {product.category}</p>
                            <p className='item__info'>Current Price: {product.currentPrice} {product.measure}</p>
                            <p className='item__info'>Last Price: {product.lastPrice}</p>
                            <p className='item__info'>Weight: {product.weight}</p>
                            <p className='item__info'>Description: {product.description}</p>
                        </div>
                    </div>
                    <div>
                        <Button variant="secondary" onClick={handleReturn} className='item__return'>
                            Return
                        </Button>
                        <Button variant="primary" onClick={handleAddToCart} className='item__add'>
                            Add to basket
                        </Button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const response = await fetch(`http://localhost:3000/api/create?id=${id}`);

    if (!response.ok) {
        console.error('Failed to fetch data:', response.statusText);
        return {
            notFound: true,
        };
    }

    const product = await response.json();

    return {
        props: product
    };
};

export default ProductPage;
