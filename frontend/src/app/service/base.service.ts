import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, filter, reduce, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends {_id?: string | number, [key: string]: any}> {

  apiUrl: string = environment.apiUrl;

  entityName: string = '';
  numOfValues: number = 0;

  constructor(
    public http: HttpClient,
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.entityName}`);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.entityName}/${id}`);
  }

  create(entity: T): Observable<T> {
    const postObject = {...entity, _id: null};
    return this.http.post<T>(`${this.apiUrl}${this.entityName}`, postObject);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.apiUrl}${this.entityName}/${entity._id}`,
      entity
    );
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${this.entityName}/${entity._id}`);
  }

  getNumberOfValue(property: string, value: string | boolean): Observable<number> {
    return  this.getAll().pipe(map(item => item.filter(i => i[property] == value).length))
  }

  getPercentageOfValue(property: string, value: string | boolean): Observable<number> {
    return this.getAll()
      .pipe
      (map
        (
          item => item
            .map(item => item[property])
            .reduce((prev,curr,index,array) => {
              return (curr === value?((prev*array.length)+1)/array.length:prev)
            },0)
        )
      );
  }

  getSumOfProperty(property: string, value:string|boolean, toSum:string): Observable<number>{
    return this.getAll()
      .pipe
      (map
        (
          item => item
            .filter(i => i[property] == value)
            .map(item => item[toSum])
            .reduce((curr,next) => curr+next)
        )
      );
  }


  // filter(i => i[property] == value),
  // map(i => i[toSum]),
  // reduce((acc,act) => acc+act)
}
