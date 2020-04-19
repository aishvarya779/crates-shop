import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { PRODUCT } from 'src/app/shared/model/model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'crs-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems$: Observable<PRODUCT[]>;
  subcription: Subject<any> = new Subject();
  totalPrice: number = 0;
  totalDiscount: number = 0;
  totalCount: number = 0;
  constructor(private cartSvc: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartSvc
      .getCartItem()
      .pipe(takeUntil(this.subcription));
    this.cartItems$.subscribe((data: PRODUCT[]) => {
      this.totalPrice = 0;
      this.totalDiscount = 0;
      this.totalCount = 0;
      data.forEach(item => {
        this.totalPrice += +item.sellingPrice.toFixed(0) * item.count;
        this.totalDiscount +=
          (+item.sellingPrice.toFixed(0) - +item.discountPrice.toFixed(0)) *
          item.count;
        this.totalCount += item.count;
      });
    });
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

  ngOnDestroy() {
    this.subcription.next();
    this.subcription.complete();
  }
}
