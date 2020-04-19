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
  constructor(private cartSvc: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartSvc
      .getCartItem()
      .pipe(takeUntil(this.subcription));
    this.cartItems$.subscribe((data: PRODUCT[]) => {
      data.forEach(item => {
        this.totalPrice += +item.sellingPrice.toFixed(0);
        this.totalDiscount += +(
          item.sellingPrice *
          (1 - item.discount / 100)
        ).toFixed(0);
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
