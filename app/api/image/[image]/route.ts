import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { images, products } from "../../upload/route";

function getFileExtension(filename: string) {
  const parts = filename.split(".");
  if (parts.length > 1) {
    return parts.pop();
  }
  return ""; // Return an empty string if there is no extension
}

export async function GET(req: NextRequest, resp: NextResponse) {
  let url = req.url;
  if (url.charAt(url.length - 1) == "/") url = url.substring(0, url.length - 1);
  url = "/api" + url.split("/api").pop();
  const filename: string = url;
  // const imageBuffer = fs.readFileSync("./public/next.svg");
  const imageBuffer = images.get(filename);
  console.log(filename, imageBuffer, products, images);
  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": "image/" + getFileExtension(filename), // Set the appropriate content type for your image
      "Content-Disposition":
        'inline; filename="example.' + getFileExtension(filename),
    },
  });
}
