import Image from 'next/image'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface ProductProps {
    currentPrice: number,
    measure: string,
    lastPrice: number | undefined,
    title: string,
    weight: string,
    imgSrc: string | StaticImport
}

export default function Product(props: ProductProps) {
    return <div className="catalog_card">
        <div>
            <Image src={props.imgSrc} alt={'company logo'} width={270} height={250} className='catalog_product-img'/>
        </div>
        <div className='catalog_price-block'>
            <p className='catalog_real-price'>
                {props.currentPrice} {props.measure}
            </p>
            { props.lastPrice &&
                <p className='catalog_last-price'>{props.lastPrice}</p>
            }
        </div>
        <div className='catalog_product-title'>{props.title}</div>
        <div className='catalog_product-gramms'>{props.weight}</div>
        <div className='catalog_product-order'>Заказать</div>
    </div>
}