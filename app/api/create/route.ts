import { NextRequest, NextResponse } from 'next/server';

import { filter, products } from '../Users';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const product = products.find(p => p.id.toString() === id);
    console.log(product)
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  }

  return NextResponse.json(products);
}
