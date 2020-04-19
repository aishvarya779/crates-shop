import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'crs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggleNav: boolean;
  itemCount$: Observable<number>;
  constructor(private cartSvc: CartService) {}

  ngOnInit(): void {
    this.itemCount$ = this.cartSvc.getCartCount();
  }
}
