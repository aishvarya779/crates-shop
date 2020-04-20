import { Pipe, PipeTransform } from '@angular/core';
import { PRODUCT } from '../model/model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(data: PRODUCT[], ...args: any[]): unknown {
    let sortOrder = args[0];
    return this.sortData(data, sortOrder);
    // return null;
  }

  sortData(data, order) {
    if (order !== 'disc') {
      data.sort((p1, p2) => {
        if (p1['sellingPrice'] < p2['sellingPrice'])
          return order === 'desc' ? 1 : -1;
        if (p1['sellingPrice'] > p2['sellingPrice'])
          return order === 'desc' ? -1 : 1;
        return 0;
      });
    } else {
      data.sort((p1, p2) => {
        if (p1['discountPrice'] < p2['discountPrice']) return 1;
        if (p1['discountPrice'] > p2['discountPrice']) return -1;
        return 0;
      });
    }
    return data;
  }
}
