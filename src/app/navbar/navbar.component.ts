import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private productService = inject(ProductService);
  
  isMenuCollapsed = signal<boolean>(true);
  
  // Get cart count from service
  cartItemCount = this.productService.cartCount;

  toggleMenu() {
    this.isMenuCollapsed.set(!this.isMenuCollapsed());
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    console.log('Search term:', searchTerm);
    // Implement search functionality here
  }
}
