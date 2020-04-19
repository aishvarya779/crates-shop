import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private modals: any[] = [];
  constructor() {}
  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.close();
  }

  showDialog(id: string) {
    let modal_t = document.getElementById(id);
    modal_t.classList.remove('hhidden');
    modal_t.classList.add('sshow');
  }
  closeDialog(id) {
    let modal_t = document.getElementById(id);
    modal_t.classList.remove('sshow');
    modal_t.classList.add('hhidden');
  }
}
