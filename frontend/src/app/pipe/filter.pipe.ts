import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T extends {[key: string]: any}> implements PipeTransform {

  /**
   * A kapott tömb szűrése a szűrőkifejezés alapján.
   * @param value {T[]} - a tömb
   * @param phrase {string} - Az objektum kulcsában keresendő kifejezés
   * @param key {string} - Az objektum kulcsa, amiben keresni fogunk. Üres string esetén nincs szűrés
   * @returns {T[]} - a kereső kifejezés alapján szűrt tömb.
   */
  transform(value: T[], phrase: string, key: string = ''): T[] {
    if (!Array.isArray(value) || !phrase || !key) return value
    return value.filter(
      item => {
        return item[key]
          .toString().toLowerCase()
          .includes(phrase.toLowerCase())
      }
    )
  }

}
