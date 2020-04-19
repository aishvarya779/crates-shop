import { Component, OnInit } from '@angular/core';
import { ResizeService } from 'src/app/shared/services/resize.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'crs-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  screenSize$: Observable<boolean>;
  list: any[] = [];
  constructor(private resizeSvc: ResizeService) {}

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push(i + 1);
    }
    this.screenSize$ = this.resizeSvc.onResize$;
  }
}
