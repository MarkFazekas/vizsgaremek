import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  /**
   * A kapott tömb rendezése a kapott kulcs alapján.
   * @param value {any[]} - a tömb
   * @param key {string} - az objektumkulcs, amely alapján rendez
   * @param dir {boolean} - Csökkenő sorrend (false esetén növekvő sorrend)
   * @returns {any[]} - a kulcs alapján rendezett tömb
   */
  transform(value: any[] | null, key: string, dir: number = 1): any[] | null {
    if (!Array.isArray(value) || !key) {
      return value;
    }
    return value.sort( (a, b) => {
      let first = a[key];
      let second = b[key];

      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return (a[key] - b[key]) * dir;
      } else {

        if (typeof first === 'object' && typeof second === 'object') {
          first = Object.values(first).join('');
          second = Object.values(second).join('');
        }

        return (
          ('' + first)
            .toLowerCase()
            .localeCompare(
              ('' + second).toLowerCase()
            )
        ) * dir;
      }
    });
  }

}
