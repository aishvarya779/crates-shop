import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { FilterComponent } from './components/filter/filter.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SortComponent } from './components/sort/sort.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { RangeSliderThumbComponent } from './components/range-slider-thumb/range-slider-thumb.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SearchComponent,
    CartIconComponent,
    FilterComponent,
    HeaderComponent,
    FooterComponent,
    SortComponent,
    DialogComponent,
    RangeSliderComponent,
    RangeSliderThumbComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  entryComponents: [
    // DialogComponent
  ],
  exports: [
    SearchComponent,
    CartIconComponent,
    FilterComponent,
    HeaderComponent,
    FooterComponent,
    SortComponent,
    DialogComponent,
    RangeSliderComponent
  ]
})
export class SharedModule {}
