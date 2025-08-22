import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Category } from '../../models/product-model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  
  // Signals
  isMenuCollapsed = signal<boolean>(true);
  categories = signal<Category[]>([]);

  // Get cart count and selected category from service
  cartItemCount = this.productService.cartCount;
  selectedCategory = this.productService.selectedCategory;

  ngOnInit(): void {
      this.productService.getCategories().subscribe(categories => {
          this.categories.set(categories);
      });
  }

  toggleMenu() {
    this.isMenuCollapsed.set(!this.isMenuCollapsed());
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    console.log('Search term:', searchTerm);
    // Implement search functionality here
  }

  onCategoryClick(category: Category) {
    console.log('Selected category:', category);
    
    // Set the selected category in the service
    this.productService.setSelectedCategory(category);
    
    // Navigate to products page
    this.router.navigate(['/products']);
    
    // Close the dropdown menu
    this.isMenuCollapsed.set(true);
  }

  onShowAllProducts() {
    console.log('Showing all products');
    
    // Clear category filter
    this.productService.clearCategoryFilter();
    
    // Navigate to products page
    this.router.navigate(['/products']);
    
    // Close the dropdown menu
    this.isMenuCollapsed.set(true);
  }
}
