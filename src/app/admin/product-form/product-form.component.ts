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
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    // Uses take here so that it will subscribe event to only once hence no need to unsubscribe again.
    if (this.id) this.productService.get(this.id).take(1).subscribe(product => {
      this.product = product
    });
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product)
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
      
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }

}
