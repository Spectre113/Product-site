import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { ProductProps } from "@/components/Product";
import multer from "multer";
import { filter, getFileExtension, images, products } from "../Users";

function saveToMemory(name: string, data: Buffer) {
  images.set(name, data);
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const milliseconds = new Date().getTime();
  const filename = "/api/image/" + milliseconds + getFileExtension(file.name);
  const buffer2: Buffer = Buffer.from(await file.arrayBuffer());
  saveToMemory(filename, buffer2);
  const measure: string = data.get("measure") as string;
  const lastPrice: number = parseInt(data.get("lastPrice") as string);
  const title: string = data.get("title") as string;
  const weight: string = data.get("weight") as string;
  const image: string = data.get("image") as string;
  const category: string = data.get("category") as string;
  const currentPrice: number = parseInt(data.get("currentPrice") as string);
  const description: string = data.get("description") as string;

  if (!file) {
    return NextResponse.json({ success: false });
  }
  products.push({
    title,
    measure,
    image: filename,
    lastPrice,
    weight,
    category,
    currentPrice,
    id: milliseconds,
    description: description,
  });
  return NextResponse.json(products);
}

export async function GET(params: NextRequest) {
  console.log("All products: " + products);
  return NextResponse.json(products);
}

export async function DELETE(request: NextRequest) {
  const data = await request.formData();
  const id = parseFloat(data.get("id")?.toString() as string);
  console.log(data.get("id"));
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      images.delete(products[i].image as string);
      break;
    }
  }
  filter(id);
  return NextResponse.json(products);
}
