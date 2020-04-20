import { Component, OnInit, ElementRef, OnDestroy, Input } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'crs-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() id: string;
  private element: any;
  constructor(private el: ElementRef, private dialogSvc: DialogService) {}

  ngOnInit(): void {
    this.el.nativeElement.addEventListener('click', () => {
      if (this.el.nativeElement.tagName.toLowerCase() !== 'crs-dialog') {
        this.close();
      }
    });
  }
  // ngOnDestroy(): void {
  //   this.dialogSvc.remove(this.id);
  //   this.element.remove();
  // }
  // open(): void {
  //   this.element.style.display = 'block';
  //   document.body.classList.add('modal-open');
  // }

  // // close modal
  // close(): void {
  //   this.element.style.display = 'none';
  //   document.body.classList.remove('modal-open');
  // }

  close(): void {
    this.el.nativeElement.classList.remove('sshow');
    this.el.nativeElement.classList.add('hhidden');
  }
}
