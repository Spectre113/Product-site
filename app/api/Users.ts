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
