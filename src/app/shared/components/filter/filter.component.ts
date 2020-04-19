import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { ResizeService } from '../../services/resize.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'crs-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  rangeSlider: FormControl;
  screenSize$: Observable<boolean>;
  constructor(
    private dialogSvc: DialogService,
    private resizeSvc: ResizeService
  ) {}

  ngOnInit(): void {
    this.screenSize$ = this.resizeSvc.onResize$;
    this.rangeSlider = new FormControl([100, 500]);
    // this.rangeSlider.valueChanges.subscribe(val => {});
  }
  showDialog(id) {
    this.dialogSvc.showDialog(id);
  }
  close(id) {
    this.dialogSvc.closeDialog(id);
  }
}
