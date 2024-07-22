import { ProductProps } from "@/components/Product";

export interface User {
  name: string;
  password: string;
}

export let users: User[] = [] as User[];
export const images = new Map<string, Buffer>();
export let products: ProductProps[] = [];
export function filter(id: number) {
  products = products.filter((x) => x.id != id);
}
// Define a mapping of image file extensions to MIME types
export const mimeTypes: any = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".tiff": "image/tiff",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

/**
 * Get the MIME type for a given image file extension.
 * @param {string} extension - The file extension (e.g., '.jpg').
 * @returns {string} The MIME type associated with the given extension.
 */
export function getMimeType(extension: string) {
  // Ensure the extension starts with a dot
  if (!extension.startsWith(".")) {
    throw new Error('Extension must start with a dot (e.g., ".jpg")');
  }

  // Look up the MIME type for the extension
  const mimeType = mimeTypes[extension.toLowerCase()];

  // Return the MIME type or a default value if not found
  return mimeType || "application/octet-stream"; // Fallback MIME type
}

export function getFileExtension(filename: string) {
  const parts = filename.split(".");
  if (parts.length > 1) {
    return "." + parts.pop();
  }
  return ""; // Return an empty string if there is no extension
}
