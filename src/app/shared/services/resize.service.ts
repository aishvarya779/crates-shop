import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export enum SCREEN_SIZE {
  xs,
  sm,
  md,
  lg,
  xl
}
@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private resizeSubject: Subject<boolean>;
  constructor() {
    this.resizeSubject = new Subject();
    this.detectScreenSize();
  }
  get onResize$(): Observable<boolean> {
    return this.resizeSubject.asObservable();
  }
  onResize(status: boolean) {
    this.resizeSubject.next(status);
  }
  detectScreenSize() {
    let cwidth = window.innerWidth;
    console.log(cwidth);
    if (cwidth < 768) {
      this.onResize(true);
    } else {
      this.onResize(false);
    }
  }
}
