import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    console.log('Loading products...');
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error = 'Failed to load products. Please make sure json-server is running.';
        this.loading = false;
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
