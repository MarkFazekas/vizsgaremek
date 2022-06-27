import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * A kapott tömb szűrése a szűrőkifejezés alapján.
   * @param value {any[]} - a tömb
   * @param phrase {string} - Az objektum kulcsában keresendő kifejezés
   * @param key {string} - Az objektum kulcsa, amiben keresni fogunk. Üres string esetén nincs szűrés
   * @returns {any[]} - a kereső kifejezés alapján szűrt tömb.
   */
  transform(
    value: any[] | null,
    key: string,
    phrase: string | number | boolean): Array<any> | null {

    if (!Array.isArray(value) || !key || !phrase) {
      return value;
    }

    phrase = typeof phrase === 'number' ? phrase : ('' + phrase).toLowerCase();

    return value.filter(item => {
      if (typeof item[key] === 'number' && typeof phrase === 'number') {
        return item[key] === phrase;
      }

      return ('' + item[key]).toLowerCase().includes(phrase as string);
    })

  }
}
