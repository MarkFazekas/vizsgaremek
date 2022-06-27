import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe<T extends {[key: string]: any}> implements PipeTransform {

  transform(value: T[], limit:number): T[] {
    if (!Array.isArray(value) || !limit) return value;
    return value.slice(0,limit);
  }

}
