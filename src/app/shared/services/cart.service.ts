import { Injectable } from '@angular/core';
import { PRODUCT, CARTDETAILS, ADDEDPRODUCT } from '../model/model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems$: BehaviorSubject<PRODUCT[]> = new BehaviorSubject([]);
  private itemCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor() {}

  getCartItem() {
    return this.cartItems$.asObservable();
  }

  getCartCount() {
    return this.itemCount$.asObservable();
  }

  updateCount(val: number, type) {
    let count = this.itemCount$.getValue();
    if (type === 'INC') {
      count = count + val;
    } else {
      count = count - val;
    }
    this.itemCount$.next(count);
  }
  addToCart(product: PRODUCT) {
    let item$ = this.cartItems$.getValue();
    let index = item$.findIndex(item => item.id === product.id);
    if (index > -1) {
      item$[index].count++;
    } else {
      product.count++;
      item$.push(product);
    }
    this.updateCount(1, 'INC');
    this.cartItems$.next(item$);
  }

  removeOneItem(product: PRODUCT) {
    let item$ = this.cartItems$.getValue();
    let index = item$.findIndex(item => item.id === product.id);
    if (index > -1) {
      item$[index].count--;
      this.cartItems$.next(item$);
      this.updateCount(1, 'DEC');
    }
  }
  removeProduct(product: PRODUCT) {
    let item$ = this.cartItems$.getValue();
    let index = item$.findIndex(item => item.id === product.id);
    if (index > -1) {
      let count = item$[index].count;
      item$.splice(index, 1);
      this.cartItems$.next(item$);
      this.updateCount(count, 'DEC');
    }
  }

  clearCart() {
    this.itemCount$.next(0);
    this.cartItems$.next([]);
  }
}
