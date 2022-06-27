import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe<T extends {[key: string]: any}> implements PipeTransform {

  /**
   * A kapott tömb rendezése a kapott kulcs alapján.
   * @param value {T[]} - a tömb
   * @param key {string} - az objektumkulcs, amely alapján rendez
   * @param desc {boolean} - Csökkenő sorrend (false esetén növekvő sorrend)
   * @returns {T[]} - a kulcs alapján rendezett tömb
   */
  transform(value: T[], key: string, desc: boolean = false): T[] {
    if (Array.isArray(value) !== true || typeof key !== "string") {
      return value;
    }

    return value.sort((a, b) => {
      let comparableA: any = a[key];
      let comparableB: any = b[key];

      if (typeof comparableA === 'boolean' && typeof comparableB === 'boolean') {
        // https://stackoverflow.com/a/66000126/4883952
        comparableA = comparableA ? 1 : 0;
        comparableB = comparableB ? 1 : 0;
      }
      // Hogyha fordított sorrend kell, akkor felcseréljük a paraméterek sorrendejét az összehasonlításnál
      if (desc) {
        [comparableA, comparableB] = [comparableB, comparableA];
      }

      if (typeof comparableA === 'number' && typeof comparableB === 'number') {
        return comparableA - comparableB;
      }
      return String(comparableA).toLocaleLowerCase().localeCompare(String(comparableB).toLocaleLowerCase());
    });


  }

}
