
import { useState } from 'react'
import '../src/css/catalog.css';
import Product, {ProductProps} from './Product'

export interface CatalogProps {
    products: ProductProps[]
}

export default function Index(props: CatalogProps) {
    const [category, setCategory] = useState<string>('All')
    return <div className="catalog">
        <div className="catalog_left-container">
            <div className="catalog_title">Products</div>
            <div className="catalog_text">You can sort by category</div>
            <select className="catalog_select" onChange={ e => setCategory(e.target.value) }>
                <option>All</option>
                {Array.from(new Set(props.products.map(x => x.category))).map(x => (<option>{x}</option>))}
            </select>
        </div>
        <div className="catalog_card-container">
            {category === 'All' ?
            props.products.map(x => <Product currentPrice={x.currentPrice} measure={x.measure} title={x.title} weight={x.weight} lastPrice={x.lastPrice} image={x.image} category={x.category}/>) :
            props.products.filter(x => x.category == category).map(x => <Product currentPrice={x.currentPrice} measure={x.measure} title={x.title} weight={x.weight} lastPrice={x.lastPrice} image={x.image} category={x.category}/>)}
        </div>
    </div>
}
