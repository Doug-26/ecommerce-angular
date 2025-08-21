import { Component, OnInit, signal, computed } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product-model';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  // Signals for reactive state management
  products = signal<Product[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');

  // Computed signals for derived state
  hasProducts = computed(() => this.products().length > 0);
  showEmptyState = computed(() => !this.loading() && !this.error() && !this.hasProducts());

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
    console.log('Initial loading state:', this.loading());
  }

  loadProducts() {
    console.log('Loading products...');
    this.loading.set(true);
    this.error.set(''); // Clear any previous errors
    console.log('Loading state set to true:', this.loading());
    
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Products loaded successfully:', products);
        console.log('Number of products:', products.length);
        this.products.set(products);
        this.loading.set(false);
        console.log('Loading state set to false:', this.loading());
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error.set('Failed to load products. Please make sure json-server is running.');
        this.loading.set(false);
        console.log('Loading state set to false due to error:', this.loading());
      }
    });
  }

  addToCart(product: Product) {
    this.productService.addToCart(product).subscribe({
      next: () => {
        alert(`${product.name} added to cart!`);
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart.');
      }
    });
  }
}
