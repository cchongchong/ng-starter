import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: IProduct | undefined;
  private subscriptionOfGetProduct!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const test = this.route.snapshot.paramMap.get('test');
    console.log(`other parameter: ${test}`)
    if (id) {
      this.subscriptionOfGetProduct = this.productService.getProduct(id, product=> this.product = product);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionOfGetProduct.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
