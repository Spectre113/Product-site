import { NextApiRequest, NextApiResponse } from 'next';
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (id) {
    const products = load();
    const product = products.find(p => p.id.toString() === id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } else {
    res.status(200).json(load());
  }
}
