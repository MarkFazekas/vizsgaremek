import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAll'
})
export class FilterAllPipe<T extends {[key: string]: any}> implements PipeTransform {

  /**
   * A kapott tömb szűrése a szűrőkifejezés alapján.
   * @param value {T[]} - a tömb
   * @param phrase {string} - Az objektum összes kulcsában keresendő kifejezés
   * @returns {T[]} - a kereső kifejezés alapján szűrt tömb.
   */
  transform(value: T[], phrase: string): T[] {
    if (!Array.isArray(value) || !phrase) return value
    return value.filter(
      item => {
        for (const itemKey in item) {
          if(item[itemKey].toString().toLowerCase().includes(phrase.toLowerCase())){
            return true;
          }
        }
        return false;
      }
    )
  }

}
