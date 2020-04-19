import { Component, OnInit } from '@angular/core';
import { ResizeService } from '../../services/resize.service';
import { Observable } from 'rxjs';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'crs-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  screenSize$: Observable<boolean>;
  constructor(
    private resizeSvc: ResizeService,
    private dialogSvc: DialogService
  ) {}

  ngOnInit(): void {
    this.screenSize$ = this.resizeSvc.onResize$;
    // this.open();
  }

  showDialog(id) {
    this.dialogSvc.showDialog(id);
  }
  close(id) {
    this.dialogSvc.closeDialog(id);
  }
}
