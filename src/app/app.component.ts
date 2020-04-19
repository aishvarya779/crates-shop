import {
  Component,
  HostListener,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { SCREEN_SIZE, ResizeService } from './shared/services/resize.service';

@Component({
  selector: 'crs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'crats-shop';
  prefix = 'is-';
  sizes = [
    {
      id: SCREEN_SIZE.xs,
      width: 576
    },
    {
      id: SCREEN_SIZE.sm,
      name: 'sm',
      css: `d-none d-sm-block d-md-none`
    },
    {
      id: SCREEN_SIZE.sm,
      name: 'md',
      css: `d-none d-md-block d-lg-none`
    },
    {
      id: SCREEN_SIZE.lg,
      name: 'lg',
      css: `d-none d-lg-block d-xl-none`
    },
    {
      id: SCREEN_SIZE.xl,
      name: 'xl',
      css: `d-none d-xl-block`
    }
  ];
  constructor(private el: ElementRef, private resizeSvc: ResizeService) {}

  ngAfterViewInit(): void {
    this.detectScreenSize();
  }
  @HostListener('window:resize', [])
  onResizer() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    let cwidth = window.innerWidth;
    if (cwidth < 768) {
      this.resizeSvc.onResize(true);
    } else {
      this.resizeSvc.onResize(false);
    }
  }
}
