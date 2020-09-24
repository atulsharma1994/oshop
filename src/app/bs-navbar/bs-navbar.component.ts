import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{

  appUser: AppUser;
  // cart$;
  shoppingItemsCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser );
    let cart$ = await this.shoppingCartService.getCart();

    cart$.subscribe(cart => {
      this.shoppingItemsCount = 0;

      for (let productId in cart.items) {
        this.shoppingItemsCount += cart.items[productId].quantity;
      }

    });

  }

  logout() {
    this.auth.logout();
  }
}
