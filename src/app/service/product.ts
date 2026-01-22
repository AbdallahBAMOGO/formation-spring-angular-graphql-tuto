import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly url = 'http://localhost:8080/graphql';

  constructor(private http: HttpClient) {}

  // --- LIRE TOUS LES PRODUITS ---
  findAll(): Observable<Product[]> {
    const body = {
      query: `query {
        findAllProducts {
          id
          name
          price
        }
      }`
    };
    return this.http.post<any>(this.url, body).pipe(
      map(res => res.data.findAllProducts)
    );
  }

  // --- CRÉER UN PRODUIT ---
  save(name: string, price: number): Observable<Product> {
    const body = {
      query: `mutation {
        saveProduct(name: "${name}", price: ${price}) {
          id
          name
        }
      }`
    };
    return this.http.post<any>(this.url, body).pipe(
      map(res => res.data.saveProduct)
    );
  }

  // --- SUPPRIMER UN PRODUIT ---
  delete(id: number): Observable<boolean> {
    const body = {
      query: `mutation {
        deleteProduct(id: ${id})
      }`
    };
    return this.http.post<any>(this.url, body).pipe(
      map(res => res.data.deleteProduct)
    );
  }

  // --- METTRE À JOUR UN PRODUIT ---
  update(id: number, name: string, price: number): Observable<Product> {
    const body = {
      query: `mutation {
        updateProduct(id: ${id}, name: "${name}", price: ${price}) {
          id
          name
          price
        }
      }`
    };
    return this.http.post<any>(this.url, body).pipe(
      map(res => res.data.updateProduct)
    );
  }
}