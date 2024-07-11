import Product from "./Product"
import '../styles/catalog.css'
import onigiri from '../img/Onigiri.jpeg'

export default function Index() {
    return <div className="catalog">
        <div className="catalog_left-container">
            <div className="catalog_title">Products</div>
            <div className="catalog_text">You can sort by category</div>
            <select className="catalog_select">
                <option>Mexican</option>
                <option>Tatar</option>
                <option>Russian</option>
                <option>Bashqrt</option>
            </select>
        </div>
        <div className="catalog_card-container">
            <Product currentPrice={500} measure={'руб.'} title='Онигири' weight='450 гр.' lastPrice={undefined} imgSrc={onigiri}/>
            <Product currentPrice={500} measure={'руб.'} lastPrice={650} title='Онигири' weight='450 гр.' imgSrc={onigiri}/>
            <Product currentPrice={500} measure={'руб.'} lastPrice={650} title='Онигири' weight='450 гр.' imgSrc={onigiri}/>
            <Product currentPrice={500} measure={'руб.'} lastPrice={650} title='Онигири' weight='450 гр.' imgSrc={onigiri}/>
            <Product currentPrice={500} measure={'руб.'} lastPrice={650} title='Онигири' weight='450 гр.' imgSrc={onigiri}/>
        </div>
        {/* 
        <div>Show more</div> */}
    </div>
}
