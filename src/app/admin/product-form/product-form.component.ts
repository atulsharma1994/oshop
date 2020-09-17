import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  // Setting it to empty object while saving product no need to get product from backend so,
  // it would be null and in view we are using two way binding with product properties which results in error.
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    // Uses take here so that it will subscribe event to only once hence no need to unsubscribe again.
    if (id) this.productService.get(id).take(1).subscribe(product => {
      this.product = product
    });
  }

  save(product) {
    this.productService.create(product);
  }

}
