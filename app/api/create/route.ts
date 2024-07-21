import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ProductProps } from '@/components/Product';

function load() {
  const dataPath = path.join(process.cwd(), 'data.json');
  const data = fs.readFileSync(dataPath, 'utf8');
  let products: ProductProps[] = [];
  try {
    products = JSON.parse(data);
  } catch (err) {
    console.error('Error parsing JSON string:', err);
  }
  return products;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const products = load();
    const product = products.find(p => p.id.toString() === id);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  }

  return NextResponse.json(load());
}
