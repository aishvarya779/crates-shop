import { Injectable } from '@angular/core';
import { PRODUCT, CARTDETAILS, ADDEDPRODUCT } from '../model/model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CARTDETAILS = {
    porduct: [],
    count: 0,
    totalPayable: 0,
    netDiscount: 0
  };
  cartDetails$: BehaviorSubject<CARTDETAILS> = new BehaviorSubject(null);
  constructor() {}

  addProductToCart(product: PRODUCT) {
    let discountAmount = product.sellingPrice * (1 - product.discount / 100);
    if (this.cartItems && this.cartItems.porduct) {
      let findProductIndex = this.cartItems.porduct.findIndex(
        item => item.product.id === product.id
      );
      if (findProductIndex > -1) {
        let temp = { ...this.cartItems.porduct[findProductIndex] };
        temp.count++;
        temp.totalDiscount += discountAmount;
        temp.totalPrice += product.sellingPrice;
        this.cartItems.porduct[findProductIndex] = temp;
      } else {
        let newPrdouct: ADDEDPRODUCT = {
          product: product,
          count: 1,
          totalDiscount: discountAmount,
          totalPrice: product.sellingPrice
        };
        this.cartItems.porduct = [...this.cartItems.porduct, newPrdouct];
      }
      this.cartItems.count++;
      this.cartItems.totalPayable += product.sellingPrice;
      this.cartItems.netDiscount += discountAmount;
      this.cartDetails$.next(this.cartItems);
    }
  }

  private getProductCount(product: PRODUCT) {
    let count = new BehaviorSubject(0);
    let index = this.cartItems.porduct.findIndex(
      item => item.product.id === product.id
    );
    if (index > -1) {
      count.next(this.cartItems.porduct[index].count);
      return count.asObservable();
    }
  }
  decreaeProductCount(cartProduct: ADDEDPRODUCT) {
    if (this.cartItems && this.cartItems.porduct) {
      let findProduct = this.cartItems.porduct.findIndex(
        item => item.product.id === cartProduct.product.id
      );
      if (findProduct > -1) {
        let temp: ADDEDPRODUCT = {
          ...this.cartItems.porduct[findProduct],
          count: this.cartItems.porduct[findProduct].count--,
          totalDiscount:
            this.cartItems.porduct[findProduct].totalDiscount -
            this.cartItems.porduct[findProduct].product.discount,
          totalPrice:
            this.cartItems.porduct[findProduct].totalPrice -
            this.cartItems.porduct[findProduct].product.sellingPrice
        };
        this.cartItems.porduct[findProduct] = temp;
        this.cartItems.count = this.cartItems.count--;
        this.cartItems.netDiscount =
          this.cartItems.netDiscount - temp.product.discount;
        this.cartItems.totalPayable =
          this.cartItems.totalPayable - temp.product.sellingPrice;
        this.cartDetails$.next(this.cartItems);
      }
    }
  }
  removeProduct(cartProduct: ADDEDPRODUCT) {
    if (this.cartItems && this.cartItems.porduct) {
      let findProduct = this.cartItems.porduct.findIndex(
        item => item.product.id === cartProduct.product.id
      );
      if (findProduct > -1) {
        this.cartItems.count =
          this.cartItems.count - this.cartItems.porduct[findProduct].count;
        this.cartItems.netDiscount =
          this.cartItems.netDiscount -
          this.cartItems.porduct[findProduct].totalDiscount;
        this.cartItems.totalPayable =
          this.cartItems.totalPayable -
          this.cartItems.porduct[findProduct].totalPrice;
        this.cartItems.porduct.splice(findProduct, 1);
        this.cartDetails$.next(this.cartItems);
      }
    }
  }

  getCartDetails(): Observable<CARTDETAILS> {
    return this.cartDetails$.asObservable();
  }
}
