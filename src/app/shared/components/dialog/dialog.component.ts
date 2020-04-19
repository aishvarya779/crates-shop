import { Component, OnInit, ElementRef, OnDestroy, Input } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'crs-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;
  constructor(private ele: ElementRef, private dialogSvc: DialogService) {}

  ngOnInit(): void {
    this.element = this.ele.nativeElement;
    if (!this.id) {
      return;
    }
    document.body.appendChild(this.element);
    this.element.addEventListener('click', el => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });
    this.dialogSvc.add(this);
  }
  ngOnDestroy(): void {
    this.dialogSvc.remove(this.id);
    this.element.remove();
  }
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}
