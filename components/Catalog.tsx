"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import Product, { ProductProps } from "./Product";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import placeholder from "../src/img/placeholder.png";
import Header from "./Header";

type ProductCategories =
  | "Everything"
  | "Sause"
  | "Giros"
  | "Salat"
  | "Mexican"
  | "Burgers";

// const products: Record<ProductCategories, ProductProps[]> = {
//     Everything: [
//         { imgSrc: placeholder, currentPrice: 500, measure: 'руб.', title: 'Onigiri', weight: '450 гр.' },
//         { imgSrc: placeholder, currentPrice: 600, measure: 'руб.', lastPrice: 700, title: 'Sushi', weight: '300 гр.' },
//         { imgSrc: placeholder, currentPrice: 700, measure: 'руб.', lastPrice: 800, title: 'Giros', weight: '400 гр.' },
//         { imgSrc: placeholder, currentPrice: 400, measure: 'руб.', title: 'Salat', weight: '250 гр.' },
//         { imgSrc: placeholder, currentPrice: 800, measure: 'руб.', lastPrice: 900, title: 'Mexican', weight: '500 гр.' },
//         { imgSrc: placeholder, currentPrice: 900, measure: 'руб.', lastPrice: 1000, title: 'Burger', weight: '350 гр.' },
//     ],
//     option1: [
//         { imgSrc: placeholder, currentPrice: 500, measure: 'руб.', title: 'Onigiri', weight: '450 гр.' },
//         { imgSrc: placeholder, currentPrice: 600, measure: 'руб.', lastPrice: 700, title: 'Sushi', weight: '300 гр.' },
//     ],
//     option2: [
//         { imgSrc: placeholder, currentPrice: 700, measure: 'руб.', lastPrice: 800, title: 'Giros', weight: '400 гр.' },
//     ],
//     option3: [
//         { imgSrc: placeholder, currentPrice: 400, measure: 'руб.', title: 'Salat', weight: '250 гр.' },
//     ],
//     option4: [
//         { imgSrc: placeholder, currentPrice: 800, measure: 'руб.', lastPrice: 900, title: 'Mexican', weight: '500 гр.' },
//     ],
//     option5: [
//         { imgSrc: placeholder, currentPrice: 900, measure: 'руб.', lastPrice: 1000, title: 'Burger', weight: '350 гр.' },
//     ]
// };

export interface CatalogProps {
  products: ProductProps[];
}

const Catalog = (props: CatalogProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("Everything");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as ProductCategories);
  };

  useEffect(() => {
    const mySelect = new Choices("#my-select", {
      shouldSort: false,
    });
  }, []);

  return (
    <section className="catalog">
      <div className="container flex">
        <div className="catalog__info-block">
          <h2 className="catalog__title">Products</h2>
          <p className="catalog__info">You can sort by category</p>
          <div className="catalog__select">
            <select
              id="my-select"
              className="my-select"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="Everything">Everything</option>
              <option value="Sause">Sause</option>
              <option value="Giros">Giros</option>
              <option value="Salat">Salat</option>
              <option value="Mexicam">Mexican</option>
              <option value="Burgers">Burgers</option>
            </select>
          </div>
        </div>
        <div className="catalog__items-block">
          <ul className="catalog__list list-reset row">
            {true
              ? props.products.map((x) => (
                  <Product
                    key={x.id}
                    currentPrice={x.currentPrice}
                    measure={x.measure}
                    title={x.title}
                    weight={x.weight}
                    lastPrice={x.lastPrice}
                    image={x.image}
                    category={x.category}
                    description={x.description}
                    id={x.id}
                  />
                ))
              : props.products
                  .filter((x) => x.category == selectedOption)
                  .map((x) => (
                    <Product
                      key={x.id}
                      currentPrice={x.currentPrice}
                      measure={x.measure}
                      title={x.title}
                      weight={x.weight}
                      lastPrice={x.lastPrice}
                      image={x.image}
                      category={x.category}
                      description={x.description}
                      id={x.id}
                    />
                  ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
