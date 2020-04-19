import { Component, OnInit } from '@angular/core';
import { ResizeService } from 'src/app/shared/services/resize.service';
import { Observable } from 'rxjs';
import { PRODUCT } from 'src/app/shared/model/model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'crs-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  screenSize$: Observable<boolean>;
  list: PRODUCT[] = [];
  constructor(private resizeSvc: ResizeService, private cartSvc: CartService) {}

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      let item: PRODUCT = {
        name: 'Tata Salt' + i,
        id: 1 + i,
        sellingPrice: 32 + i * 14,
        count: 0,
        discount: 24 + i * 0.6,
        img: 'assets/tata_salt.jpeg'
      };
      this.list.push(item);
    }
    this.screenSize$ = this.resizeSvc.onResize$;
  }

  addToCart(product: PRODUCT) {
    this.cartSvc.addToCart(product);
  }
}
