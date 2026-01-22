import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product';
import { Product } from '../../model/product.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', price: 0 };
  editingProduct: Product | null = null;
  loading = false;
  saving = false;
  updating = false;
  deleting: number | null = null;

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // loadProducts(): void {
  //   this.loading = true;
  //   this.productService.findAll().subscribe({
  //     next: (data) => {
  //       this.products = data;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error loading products', err);
  //       this.loading = false;
  //     }
  //   });
  // }
  loadProducts(): void {
  this.loading = true;
  this.productService.findAll().subscribe({
    next: (data) => {
      this.products = data;
      this.loading = false;
      this.cdr.detectChanges(); // Force Angular à redessiner le tableau
    }
  });
}

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price > 0) {
      this.saving = true;
      this.productService.save(this.newProduct.name, this.newProduct.price).subscribe({
        next: (product) => {
          this.loadProducts(); // Reload to ensure consistency
          this.newProduct = { id: 0, name: '', price: 0 };
          this.saving = false;
        },
        error: (err) => {
          console.error('Error adding product', err);
          this.saving = false;
        }
      });
    }
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
  }

  updateProduct(): void {
    if (this.editingProduct && this.editingProduct.name && this.editingProduct.price > 0) {
      this.updating = true;
      this.productService.update(this.editingProduct.id, this.editingProduct.name, this.editingProduct.price).subscribe({
        next: (updatedProduct) => {
          this.loadProducts(); // Reload to ensure consistency
          this.editingProduct = null;
          this.updating = false;
        },
        error: (err) => {
          console.error('Error updating product', err);
          this.updating = false;
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }

  deleteProduct(id: number): void {
    this.deleting = id;
    this.productService.delete(id).subscribe({
      next: () => {
        this.loadProducts(); // Reload to ensure consistency
        this.deleting = null;
      },
      error: (err) => {
        console.error('Error deleting product', err);
        this.deleting = null;
      }
    });
  }
}
