import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
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

export const POST = async (request: NextRequest) => {
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

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const milliseconds = new Date().getTime();
  const filename = path.join('public', 'uploads', milliseconds + file.name);
  const dirname = path.join('public', 'uploads');

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  await writeFile(filename, buffer);

  console.log(`open ${filename} to see the uploaded file`);
  console.log(filename);
  const imageName = milliseconds + file.name;
  const imageSource = '/uploads/' + imageName;
  products.push({ title, measure, image: imageSource, lastPrice, weight, category, currentPrice, id: milliseconds, description });
  save(products);
  return NextResponse.json(products);
};

export const GET = async (request: NextRequest) => {
  return NextResponse.json(load());
};

export const DELETE = async (request: NextRequest) => {
  let products = load();
  const data = await request.formData();
  const id = parseFloat(data.get("id")?.toString() as string);
  console.log(data.get("id"));
  fs.rmSync(path.join('public', products.find(x => x.id == id)?.image as string));
  products = products.filter(x => x.id != id);
  save(products);
  return NextResponse.json(products);
};
