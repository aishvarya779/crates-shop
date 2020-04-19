import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  HostBinding,
  OnDestroy,
  HostListener,
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { pairwise, filter, takeUntil, first, map } from 'rxjs/operators';
interface Validation {
  valid: boolean;
  respectsMin: boolean;
  respectsMax: boolean;
}
@Component({
  selector: 'crs-range-slider-thumb',
  templateUrl: './range-slider-thumb.component.html',
  styleUrls: ['./range-slider-thumb.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RangeSliderThumbComponent
    }
  ]
})
export class RangeSliderThumbComponent
  implements OnInit, ControlValueAccessor, OnDestroy, AfterViewInit {
  @Input() min = 0;

  @Input() max = 0;

  @HostBinding('class.pressed')
  pointerdown: boolean;

  touchEvents$ = new Subject<TouchEvent | PointerEvent>();

  @HostBinding('style.left.px') left: number = 0;

  @HostBinding('class.disabled') disabled: boolean = false;

  @HostListener('pointerdown', ['$event'])
  onPointerDown(e: TouchEvent) {
    this.pointerdown = true;
  }

  @HostListener('window:pointerup', ['$event'])
  onPointerUp(e: TouchEvent) {
    this.pointerdown = false;

    this.touchEvents$.next(null);
  }

  @HostListener('window:pointermove', ['$event'])
  onPointerMove(e: TouchEvent) {
    if (this.pointerdown) {
      this.touchEvents$.next(e);
    }
  }

  @HostListener('touchstart', ['$event'])
  ontouchStart(e: TouchEvent) {
    this.pointerdown = true;
    e.preventDefault();
  }

  @HostListener('window:touchend', ['$event'])
  ontouchEnd(e: TouchEvent) {
    this.pointerdown = false;

    this.touchEvents$.next(null);
  }

  @HostListener('window:touchmove', ['$event'])
  ontouchMove(e: TouchEvent) {
    if (this.pointerdown) {
      this.touchEvents$.next(e);
      e.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  onBlur() {
    this.onTouchedCallback();
  }

  private onTouchedCallback: Function;

  private onChangeCallback: Function;

  private cachedBoundingClientRectWidth = null;

  private cachedBoundingClientRectWidthCalculated$ = new Subject<boolean>();

  private stop$ = new Subject<void>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.touchEvents$
      .pipe(
        filter(e => e != null),
        map(e => {
          if (e instanceof TouchEvent) {
            return e.touches[0].clientX;
          } else if (e instanceof PointerEvent) {
            return e.x;
          } else {
            return null;
          }
        }),
        pairwise(),
        filter(
          ([eventOneX, eventTwoX]) => eventOneX != null && eventTwoX != null
        ),
        takeUntil(this.stop$)
      )
      .subscribe(([eventOneX, eventTwoX]) => {
        const xDiff = eventTwoX - eventOneX;

        const newLeftValue = this.left + xDiff;

        const validation = this.validateNewValue(newLeftValue);

        if (validation.valid) {
          this.left += xDiff;
        }

        if (this.onChangeCallback) {
          const newValue = this.calculateValueRelatively();
          this.onChangeCallback(newValue);
        }
      });
  }

  ngAfterViewInit() {
    this.cachedBoundingClientRectWidth = this.elementRef.nativeElement.getBoundingClientRect().width;

    this.cachedBoundingClientRectWidthCalculated$.next(true);
  }

  async writeValue(value: number) {
    if (value == null) {
      return;
    }

    if (this.cachedBoundingClientRectWidth == null) {
      await this.cachedBoundingClientRectWidthCalculated$
        .pipe(first(Boolean))
        .toPromise();
    }

    /**
     * We are off by 20 pixels here, so we want to calculate what the written value means internally */
    const internalValueRelatively =
      (value * (this.max - this.cachedBoundingClientRectWidth)) / this.max;

    const validation = this.validateNewValue(internalValueRelatively);
    if (validation.valid) {
      this.left = value;
    } else if (!validation.respectsMax) {
      // Means the value exceeded the max, so we will set it to the max
      //
      this.left = this.max - this.cachedBoundingClientRectWidth;
    } else if (!validation.respectsMin) {
      // Means the value was below the min, so we will set it to the min
      //
      this.left = 0;
    }

    setTimeout(() => {
      const newValue = this.calculateValueRelatively();
      this.onChangeCallback(newValue);
    });
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy() {
    this.stop$.next();
  }

  /**
   * Because we are usnig the left property, if the slider is set to max value
   * with 300px slider width, the left value will be 280 which translates to 100% */
  private calculateValueRelatively() {
    /** We have to take the internal width calc into account */
    const newValue =
      (this.left * this.max) / (this.max - this.cachedBoundingClientRectWidth);

    return newValue;
  }

  private validateNewValue(newLeftValue: number): Validation {
    const minValue = this.min + this.cachedBoundingClientRectWidth;
    const maxValue = this.max - this.cachedBoundingClientRectWidth;

    const respectsMin = newLeftValue >= this.min;

    const respectsMax = newLeftValue <= maxValue;

    const valid = respectsMin && respectsMax;

    return { valid, respectsMin, respectsMax };
  }
}
