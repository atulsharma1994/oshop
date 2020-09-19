import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filterProducts: any[];
  subscription: Subscription;

  constructor(productService: ProductService) {
    this.subscription = productService.getAll()
      .subscribe(products => {
        this.filterProducts = this.products = products;
      });
  }

  ngOnInit() {
  }

  // Filtering based on title
  filter(query: string) {
    this.filterProducts = (query) ?
      this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
