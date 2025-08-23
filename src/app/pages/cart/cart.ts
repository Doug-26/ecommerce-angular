import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { CartItem } from '../../models/product-model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  private productService = inject(ProductService);

  // Signals for reactive state management
  cartItems = signal<CartItem[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');

  // Computed signals for derived state
  hasItems = computed(() => this.cartItems().length > 0);
  totalItems = computed(() => this.cartItems().length);
  totalPrice = computed(() => 
    this.cartItems().reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)
  );
  showEmptyState = computed(() => !this.loading() && !this.error() && !this.hasItems());

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.loading.set(true);
    this.error.set('');
    
    this.productService.getCartItems().subscribe({
      next: (items) => {
        console.log('Cart items loaded:', items);
        this.cartItems.set(items);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading cart items:', error);
        this.error.set('Failed to load cart items. Please make sure json-server is running.');
        this.loading.set(false);
      }
    });
  }

  removeFromCart(item: CartItem) {
    const cartItemId = item.cartId || item.id;
    this.productService.removeFromCart(cartItemId).subscribe({
      next: () => {
        console.log(`${item.name} removed from cart`);
        // Reload cart items to reflect changes
        this.loadCartItems();
      },
      error: (error) => {
        console.error('Error removing from cart:', error);
        alert('Failed to remove item from cart.');
      }
    });
  }

  clearCart() {
    if (confirm('Are you sure you want to clear all items from your cart?')) {
      const items = this.cartItems();
      let completedRequests = 0;
      
      if (items.length === 0) return;
      
      items.forEach(item => {
        const cartItemId = item.cartId || item.id;
        this.productService.removeFromCart(cartItemId).subscribe({
          next: () => {
            completedRequests++;
            if (completedRequests === items.length) {
              // Reload cart after all items are removed
              this.loadCartItems();
            }
          },
          error: (error) => {
            console.error('Error clearing cart:', error);
            completedRequests++;
            if (completedRequests === items.length) {
              this.loadCartItems();
            }
          }
        });
      });
    }
  }
}
