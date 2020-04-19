import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';

export type RangeSliderValue = [number, number];
@Component({
  selector: 'crs-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RangeSliderComponent
    }
  ]
})
export class RangeSliderComponent implements OnInit, ControlValueAccessor {
  @Input() min = 0;

  @Input() max = 200;

  public form = this.fb.group({
    firstThumb: [],
    secondThumb: []
  });

  cachedBoundingClientRectWidth = null;

  private onTouchedCallback;

  private cachedBoundingClientRectWidthCalculated$ = new Subject();

  @HostListener('blur')
  onBlur() {
    this.onTouchedCallback();
  }

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.cachedBoundingClientRectWidth = this.elementRef.nativeElement.getBoundingClientRect().width;

      this.cachedBoundingClientRectWidthCalculated$.next(true);
    });
  }

  transformPixelToValue(pixelValue: number) {
    if (this.cachedBoundingClientRectWidth === null) {
      return 0;
    }

    const value = (pixelValue * this.max) / this.cachedBoundingClientRectWidth;

    const roundedValue = Math.ceil((value * 100) / 100).toFixed(2);

    return roundedValue;
  }

  private async transformValueToPixel(value: number) {
    if (this.cachedBoundingClientRectWidth == null) {
      await this.cachedBoundingClientRectWidthCalculated$
        .pipe(first(Boolean))
        .toPromise();
    }

    const pixelValue = (this.cachedBoundingClientRectWidth * value) / this.max;
    return pixelValue;
  }

  async writeValue(newValue: RangeSliderValue) {
    const [firstThumbValue, secondThumbValue] = newValue;

    const firstThumb = await this.transformValueToPixel(firstThumbValue);

    const secondThumb = await this.transformValueToPixel(secondThumbValue);

    this.form.setValue({ firstThumb, secondThumb });
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(newValue => {
      const pixelValueInverted = pixels => {
        return (pixels * this.max) / this.cachedBoundingClientRectWidth;
      };
      fn([
        pixelValueInverted(newValue.firstThumb),
        pixelValueInverted(newValue.secondThumb)
      ] as RangeSliderValue);
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
