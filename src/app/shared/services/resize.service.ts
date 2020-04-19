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
  }
  get onResize$(): Observable<boolean> {
    return this.resizeSubject.asObservable();
  }
  onResize(status: boolean) {
    this.resizeSubject.next(status);
  }
}
