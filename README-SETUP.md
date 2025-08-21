# E-Commerce Angular Project with JSON Server

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start JSON Server (API Backend)
```bash
npm run json-server
```
This will start the API server on `http://localhost:3000`

### 3. Start Angular Development Server
```bash
npm start
```
This will start the Angular app on `http://localhost:4200`

## API Endpoints

The JSON Server provides the following endpoints:

- **Products**: `http://localhost:3000/products`
- **Categories**: `http://localhost:3000/categories`
- **Cart**: `http://localhost:3000/cart`
- **Orders**: `http://localhost:3000/orders`

## Available Features

- ✅ Product listing with real data
- ✅ Add to cart functionality
- ✅ Responsive navbar
- ✅ Product categories
- ✅ Product search (coming soon)
- ✅ Checkout page (basic layout)

## Sample Data

The `db.json` file contains:
- 8 sample products with images, prices, and descriptions
- 6 product categories
- Empty cart and orders arrays

## Development Notes

- Products are loaded from JSON Server API
- Images are sourced from Unsplash for better visuals
- Bootstrap is used for responsive styling
- Font Awesome icons are included via CDN
