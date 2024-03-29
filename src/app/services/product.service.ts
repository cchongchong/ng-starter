import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { IProduct } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'assets/products/products.json';

  constructor(private http: HttpClient) { }

  getProducts(callback: (products: IProduct[]) => any): Subscription {
    return this.http.get<IProduct[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      ).subscribe({
        next: products => callback(products),
        error: err => this.processErrorMessage(err)
      });
  }

  getProduct(id: number, callback: (product: IProduct | undefined) => any): Subscription {
    return this.getProducts((products: IProduct[]) => callback(products.find(p => p.productId === id)));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    this.processErrorMessage(errorMessage);
    return throwError(errorMessage);
  }

  private processErrorMessage(errorMessage: string) {
    console.error(errorMessage);
  }

}