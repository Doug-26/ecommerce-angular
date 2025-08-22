import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';
  
  // Signal to track cart count
  private _cartCount = signal<number>(0);
  readonly cartCount = this._cartCount.asReadonly();

  // Signals for category filtering
  private _selectedCategory = signal<Category | null>(null);
  readonly selectedCategory = this._selectedCategory.asReadonly();

  private _filteredProducts = signal<Product[]>([]);
  readonly filteredProducts = this._filteredProducts.asReadonly();

  private _allProducts = signal<Product[]>([]);
  readonly allProducts = this._allProducts.asReadonly();

  constructor(private http: HttpClient) { 
    // Initialize cart count
    this.loadCartCount();
  }

  // Get all products
  getProducts(): Observable<Product[]> {
    console.log('Fetching products from API...');
    console.log('API URL:', `${this.apiUrl}/products`);
    const products$ = this.http.get<Product[]>(`${this.apiUrl}/products`);
    
    // Update allProducts signal when products are fetched
    products$.subscribe({
      next: (products) => {
        this._allProducts.set(products);
        // If no category is selected, show all products
        if (!this._selectedCategory()) {
          this._filteredProducts.set(products);
        }
      },
      error: (error) => {
        console.error('Failed to fetch products:', error);
      }
    });
    
    return products$;
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

  // Category filtering methods
  setSelectedCategory(category: Category | null) {
    this._selectedCategory.set(category);
    this.filterProductsByCategory();
  }

  clearCategoryFilter() {
    this._selectedCategory.set(null);
    this._filteredProducts.set(this._allProducts());
  }

  private filterProductsByCategory() {
    const selectedCategory = this._selectedCategory();
    const allProducts = this._allProducts();
    
    if (selectedCategory) {
      const filtered = allProducts.filter(product => 
        product.category.toLowerCase() === selectedCategory.name.toLowerCase()
      );
      this._filteredProducts.set(filtered);
    } else {
      this._filteredProducts.set(allProducts);
    }
  }

  // Add product to cart
  addToCart(product: Product): Observable<any> {
    const addToCartRequest = this.http.post(`${this.apiUrl}/cart`, product);
    
    // Update cart count signal after successful add
    addToCartRequest.subscribe({
      next: () => {
        this._cartCount.update(count => count + 1);
      },
      error: (error) => {
        console.error('Failed to add to cart:', error);
      }
    });
    
    return addToCartRequest;
  }

  // Get cart items
  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/cart`);
  }

  // Remove item from cart
  removeFromCart(id: number): Observable<any> {
    const removeRequest = this.http.delete(`${this.apiUrl}/cart/${id}`);
    
    // Update cart count signal after successful removal
    removeRequest.subscribe({
      next: () => {
        this._cartCount.update(count => Math.max(0, count - 1));
      },
      error: (error) => {
        console.error('Failed to remove from cart:', error);
      }
    });
    
    return removeRequest;
  }

  // Load current cart count
  private loadCartCount() {
    this.getCartItems().subscribe({
      next: (items) => {
        this._cartCount.set(items.length);
      },
      error: (error) => {
        console.error('Failed to load cart count:', error);
      }
    });
  }
}
