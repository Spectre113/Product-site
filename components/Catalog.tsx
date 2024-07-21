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

export interface CatalogProps {
  products: ProductProps[];
}

const Catalog = (props: CatalogProps) => {
    const [selectedOption, setSelectedOption] = useState<ProductCategories>('Everything');

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
                    <h2 className="catalog__title">
                        Products
                    </h2>
                    <p className="catalog__info">
                        You can sort by category
                    </p>
                    <div className="catalog__select">
                        <select id="my-select" className="my-select" value={selectedOption} onChange={handleChange}>
                            <option value="Everything">Everything</option>
                            <option value="Sause">Sause</option>
                            <option value="Giros">Giros</option>
                            <option value="Salat">Salat</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Burgers">Burgers</option>
                        </select>
                    </div>
                </div>
                <div className="catalog__items-block">
                    <ul className="catalog__list list-reset row">
                    {selectedOption === 'Everything' ?
                        props.products.map(x => <Product key={x.id} {...x} />) :
                        props.products.filter(x => x.category === selectedOption).map(x => <Product key={x.id} {...x} />)}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Catalog;
