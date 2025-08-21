import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  // Get single product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?category=${category}`);
  }

  // Get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // Search products
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?q=${query}`);
  }

  // Add product to cart
  addToCart(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, product);
  }

  // Get cart items
  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/cart`);
  }

  // Remove item from cart
  removeFromCart(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${id}`);
  }
}
