import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: Products,
        title: 'Products - E-Shop'
    },
    {
        path: 'checkout',
        component: Checkout,
        title: 'Checkout - E-Shop'
    },
    {
        path: '**',
        redirectTo: '/products'
    }
];
