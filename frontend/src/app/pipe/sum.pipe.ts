import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe<T extends { [key: string]: any }> implements PipeTransform {

  transform(list: T[], key: string): number {
    if (!(Array.isArray(list))) {
      return 0;
    }
    return list.reduce((acc, next) => {
      if (typeof (next[key]) === 'number') return next[key] + acc;
      if ((typeof (next[key]) === 'string') && (next[key] !== '')) return ++acc;
      if (typeof (next[key]) === 'boolean') return next[key] + acc; //boolean és true

    }, 0);
  }

}
