import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  filteredProducts: Product[] = [];
  products: Product[] = [];
  categories$;
  category: string;

  constructor(productService: ProductService, categoryService: CategoryService, router: ActivatedRoute) {
    productService.getAll()
      .switchMap((products: any) => {
        this.products = products;
        return router.queryParamMap;
      }).subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(product => product.category === this.category) :
          this.products
      });

    this.categories$ = categoryService.getAll();

  }

}
