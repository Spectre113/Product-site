import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { ProductProps } from '@/components/Product';



function save(products: ProductProps[]) {
  // Convert JSON object to string
  const jsonString = JSON.stringify(products, null, 4);

  // Write JSON string to a file
  fs.writeFile('data.json', jsonString, (err: any) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File has been written');
    }
  });
}

function load() {
  // Read JSON file
  let products: ProductProps[] = []
  if (!fs.existsSync('data.json')) save(products)
  const data = fs.readFileSync('data.json', 'utf8')
  try {
    const jsonObject = JSON.parse(data);
    products = jsonObject
    console.log('JSON object:', jsonObject);
  } catch (err) {
    console.error('Error parsing JSON string:', err);
  }
  return products
}


load()

export async function POST(request: NextRequest) {
  const products = load()
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  const measure: string = data.get('measure') as string
  const lastPrice: number = parseInt(data.get('lastPrice') as string)
  const title: string = data.get('title') as string
  const weight: string = data.get('weight') as string
  const image: string = data.get('image') as string
  const category: string = data.get('category') as string
  const currentPrice: number = parseInt(data.get('currentPrice') as string)

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)



  let fileName = '/uploads/' + new Date().valueOf() + file.name

  const dir = path.resolve('./public')
  if (!fs.existsSync(path.join(dir, './uploads'))) {
    fs.mkdirSync(path.join(dir, './uploads'));
  }
  const filePath = path.join(dir, fileName)
  await writeFile(filePath, buffer)

  console.log(`open ${filePath} to see the uploaded file`)
  console.log(filePath)
  products.push({ title, measure, image: fileName, lastPrice, weight, category, currentPrice, id: new Date().getTime() })
  save(products)
  return NextResponse.json(products)
}

export async function GET(params: NextRequest) {
  return NextResponse.json(load())
}

export async function DELETE(request: NextRequest) {
  let products = load()
  const data = await request.formData()
  const id = parseInt(data.get("id") as string)
  fs.rmSync(path.join('public', products.find(x => x.id == id)?.image as string))
  products = products.filter(x => x.id != id)
  save(products)
  return NextResponse.json(products)
}