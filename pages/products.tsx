'use client'

import Layout from '../components/Layout';
import Catalog from '../components/Catalog';
import { useEffect, useState } from 'react';
import { ProductProps } from '@/components/Product';

const Products = () => {
    const [products, setProducts] = useState<ProductProps[]>([])

    console.log(products)
    useEffect(() => {
        fetch('/api/upload', {
            method: 'GET',
        }).then(resp => resp.json())
            .then(resp => setProducts(resp))
    }, [])

    return (
        < Layout >
            <Catalog products={products} />
        </ Layout>
    );
};

export default Products;