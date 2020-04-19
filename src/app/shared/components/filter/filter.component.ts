import {
  Component,
  OnInit,
  AfterViewInit,
  SimpleChanges,
  AfterContentInit,
  AfterViewChecked
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { ResizeService } from '../../services/resize.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'crs-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent
  implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked {
  rangeSlider: FormControl;
  screenSize$: Observable<boolean>;
  constructor(
    private dialogSvc: DialogService,
    private resizeSvc: ResizeService
  ) {}

  ngOnInit(): void {
    // this.screenSize$ = this.resizeSvc.onResize$;
    // this.screenSize$.subscribe(val => {
    //   console.log(val);
    // });
    this.rangeSlider = new FormControl([100, 500]);
    this.screenSize$ = this.resizeSvc.onResize$;
    // this.rangeSlider.valueChanges.subscribe(val => {});
  }
  ngAfterContentInit() {}
  ngAfterViewInit() {
    console.log(this.screenSize$);
    this.screenSize$.subscribe(val => {
      console.log(val);
    });
  }
  ngAfterViewChecked(): void {
    this.resizeSvc.detectScreenSize();
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
  }
  showDialog(id) {
    this.dialogSvc.showDialog(id);
  }
  close(id) {
    this.dialogSvc.closeDialog(id);
  }
}
