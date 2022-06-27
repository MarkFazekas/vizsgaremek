import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';


interface IPageBtn {
  page: number;
};

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent<T extends {[prop: string]: any}> implements OnInit {

  @Input() tableColumns: ITableColumn[] = [];
  @Input() list$: Observable<T[]> = of([]);
  @Input() filterKey: string = '';
  @Input() entity: string = '';

  @Output() selectOne: EventEmitter<T> = new EventEmitter<T>();
  @Output() deleteOne: EventEmitter<T> = new EventEmitter<T>();

  entitiesNum: number = 0;
  phrase: string = '';

  constructor(
    private config: ConfigService,
  ) {

  }

  ngOnInit(): void {
    this.list$.subscribe(
      list => this.entitiesNum = list.length
    );
  }

  onSelect(entity: T): void {
    this.selectOne.emit(entity);
  }

  onDelete(entity: T): void {
    this.deleteOne.emit(entity);
  }

  pageSize: number = 10;
  pageStart: number = 1;
  currentPage: number = 1;

  get pageSliceStart(): number {
    const index = this.currentPage - 1;
    return index === 0 ? 0 : (index * this.pageSize);
  }
  get pageSliceEnd(): number {
    return this.pageSliceStart + this.pageSize;
  }

  get paginator(): IPageBtn[] {
    const pages: IPageBtn[] = [];
    for (let i = 0; i < this.entitiesNum / this.pageSize && pages.length < 10; i++ ) {
      const page = this.pageStart + i;
      pages.push({page});
    }
    return pages;
  }

  onPaginate(event: Event, btn: IPageBtn): void {
    event.preventDefault();
    this.currentPage = btn.page;
    this.pageStart = (btn.page - 5) < 1 ? 1 : (btn.page - 5);
  }

  onStepPage(event: Event, step: number): void {
    event.preventDefault();
    this.currentPage += step;
    this.pageStart = (this.currentPage - 5) < 1 ? 1 : (this.currentPage - 5);
  }

  searchEvent(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  columnKey : string = '';
  sortDir : number = -1;

  onColumnSelect(key : string): void {
    this.columnKey = key;
    this.sortDir = this.sortDir * (-1);
  }

  getDeepVariable(object: T, key: string): any{
    let currentObject = object
    const objectSteps = key.split(".");
    for(let keyStep of objectSteps){
      currentObject = currentObject[keyStep];
    }
    return currentObject;
  }

}
