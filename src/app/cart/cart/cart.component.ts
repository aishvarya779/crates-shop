import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PRODUCT } from 'src/app/shared/model/model';

@Component({
  selector: 'crs-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<PRODUCT[]>;
  subcription: Subscription;
  constructor(private cartSvc: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartSvc.getCartItem();
  }

  updateCount(product, type) {
    if (type === 'INC') {
      this.cartSvc.addToCart(product);
    } else {
      this.cartSvc.removeOneItem(product);
    }
  }

  removeProduct(product) {
    this.cartSvc.removeProduct(product);
  }
}
