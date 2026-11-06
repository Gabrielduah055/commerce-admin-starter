import { ADMIN_CONFIG } from './core/admin.config';
import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { pendingChangesGuard } from './core/pending-changes.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: `Sign in | ${ADMIN_CONFIG.businessName} Admin`,
    loadComponent: () => import('./features/auth/login.page').then((module) => module.LoginPage),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/admin-shell.component').then((module) => module.AdminShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: `Overview | ${ADMIN_CONFIG.businessName} Admin`,
        loadComponent: () => import('./features/dashboard/dashboard.page').then((module) => module.DashboardPage),
      },
      {
        path: 'orders',
        title: `Orders | ${ADMIN_CONFIG.businessName} Admin`,
        loadComponent: () => import('./features/orders/orders.page').then((module) => module.OrdersPage),
      },
      {
        path: 'orders/:id',
        title: `Order details | ${ADMIN_CONFIG.businessName} Admin`,
        loadComponent: () => import('./features/orders/order-detail.page').then((module) => module.OrderDetailPage),
      },
      {
        path: 'customers',
        title: `Customers | ${ADMIN_CONFIG.businessName} Admin`,
        loadComponent: () => import('./features/customers/customers.page').then((module) => module.CustomersPage),
      },
      {
        path: 'customers/:id',
        title: `Customer details | ${ADMIN_CONFIG.businessName} Admin`,
        loadComponent: () => import('./features/customers/customer-detail.page').then((module) => module.CustomerDetailPage),
      },
      {
        path: 'products',
        title: `Products | ${ADMIN_CONFIG.businessName} Admin`,
        loadComponent: () => import('./features/products/products.page').then((module) => module.ProductsPage),
      },
      {
        path: 'products/new',
        title: `Add product | ${ADMIN_CONFIG.businessName} Admin`,
        canDeactivate: [pendingChangesGuard],
        loadComponent: () => import('./features/products/product-form.page').then((module) => module.ProductFormPage),
      },
      {
        path: 'products/:id/edit',
        title: `Edit product | ${ADMIN_CONFIG.businessName} Admin`,
        canDeactivate: [pendingChangesGuard],
        loadComponent: () => import('./features/products/product-form.page').then((module) => module.ProductFormPage),
      },
      {
        path: 'categories',
        title: `Categories | ${ADMIN_CONFIG.businessName} Admin`,
        loadComponent: () => import('./features/categories/categories.page').then((module) => module.CategoriesPage),
      },
      {
        path: 'reviews',
        title: `Reviews | ${ADMIN_CONFIG.businessName} Admin`,
        loadComponent: () => import('./features/reviews/reviews.page').then((module) => module.ReviewsPage),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
