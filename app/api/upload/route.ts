import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const globalProducts: any[] = []

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  const measure: string = data.get('measure') as string
  const lastPrice: string = data.get('lastPrice') as string
  const title: string = data.get('title') as string
  const weight: string = data.get('weight') as string
  const image: string = data.get('image') as string
  const category: string = data.get('category') as string
  const currentPrice: string = data.get('currentPrice') as string

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
  globalProducts.push({ title, measure, image: fileName, lastPrice, weight, category, currentPrice })

  return NextResponse.json(globalProducts)
}

export async function GET(params: NextRequest) {
  return NextResponse.json(globalProducts)
}