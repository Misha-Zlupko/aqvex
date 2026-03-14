import axios from "axios";
import type { ProductsResponse } from "@/types/product.types";

const api = axios.create({
  baseURL: "https://ip-194-99-21-145-139178.vps.hosted-by-mvps.net/api/v1",
  timeout: 10000,
});

export async function fetchProducts() {
  const response = await api.get<ProductsResponse>("/products");
  return response.data.data.products;
}

