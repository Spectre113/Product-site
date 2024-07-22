import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { getFileExtension, getMimeType, images, products } from "../../Users";

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
      "Content-Type": "image/" + getMimeType(getFileExtension(filename)), // Set the appropriate content type for your image
      "Content-Disposition":
        'inline; filename="example.' + getMimeType(getFileExtension(filename)),
    },
  });
}
