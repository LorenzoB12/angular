import { Component, Output, EventEmitter } from '@angular/core';


import { DatatableBase } from './datatable-base';

@Component({
  selector: 'datatableC',
  templateUrl: './datatableC.template.html'
})
export class DatatableC extends DatatableBase {

  @Output() onView = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onOpenMap = new EventEmitter();

  filterRows: Array<any> = [];

  constructor() {
    super();
  }

  loadPage(pagedData) {
    let list = [];
    pagedData.forEach(item => {
      list.push(item);
    });

    this.rows = list;
    this.filter();
  }

  setSort(sortInfo) {
    this.sorts = sortInfo.sorts;
    this.filter();
  }

  setSearch(search) {
    this.search = search;
    this.filter();
  }

  filter() {
    if (!this.search) {
      this.filterRows = this.rows;
    } else {
      const val = this.search.toLowerCase();
      this.filterRows = this.rows.filter((item) => {
        for (let i = 0; i < this.columns.length; i++) {
          if (this.columns[i].sortable && item[this.columns[i].prop].toString().toLowerCase().indexOf(val) !== -1) {
            return true;
          }
        }
      });
    }
  }

  view(row) {
    this.onView.emit(row);    
  }

  edit(row) {
    this.onEdit.emit(row);
  }

  delete(row) {
    this.onDelete.emit(row);
  }

  openMap(row) {
    this.onOpenMap.emit(row);
  }
}