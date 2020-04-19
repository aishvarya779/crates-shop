import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'crs-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  rangeSlider: FormControl;
  constructor() {}

  ngOnInit(): void {
    this.rangeSlider = new FormControl([100, 500]);
    this.rangeSlider.valueChanges.subscribe(val => {});
  }
}
