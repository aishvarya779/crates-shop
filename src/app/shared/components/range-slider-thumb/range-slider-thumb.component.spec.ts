import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSliderThumbComponent } from './range-slider-thumb.component';

describe('RangeSliderThumbComponent', () => {
  let component: RangeSliderThumbComponent;
  let fixture: ComponentFixture<RangeSliderThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSliderThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSliderThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
