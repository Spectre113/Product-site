import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { ProductProps } from '@/components/Product';

const save = (products: ProductProps[]) => {
    const jsonString = JSON.stringify(products, null, 4);
    fs.writeFileSync('data.json', jsonString);
  };
  
  const load = (): ProductProps[] => {
    let products: ProductProps[] = [];
    if (!fs.existsSync('data.json')) save(products);
    const data = fs.readFileSync('data.json', 'utf8');
    try {
      const jsonObject = JSON.parse(data);
      products = jsonObject;
      console.log('JSON object:', jsonObject);
    } catch (err) {
      console.error('Error parsing JSON string:', err);
    }
    return products;
  };

export async function POST(request: NextRequest) {
    const products = load();
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const measure: string = data.get('measure') as string;
    const lastPrice: number = parseInt(data.get('lastPrice') as string);
    const title: string = data.get('title') as string;
    const weight: string = data.get('weight') as string;
    const image: string = data.get('image') as string;
    const category: string = data.get('category') as string;
    const currentPrice: number = parseInt(data.get('currentPrice') as string);
    const description: string = data.get('description') as string;
    const id = parseFloat(data.get("id")?.toString() as string);

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products[i] = { title, measure, image, lastPrice, weight, category, currentPrice, id, description };
            break;
        }
    }

    save(products);
    return NextResponse.json(products);
}
