import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppService } from '../../app/app.service';

import { ColumnType } from './column-type';
import { DatatableBase } from './datatable-base';

@Component({
  selector: 'datatable',
  templateUrl: './datatable.template.html'
})
export class Datatable extends DatatableBase {

  @Input() parent;  
  @Output() dataTableLineClick = new EventEmitter();

  constructor( public appService: AppService) {
    super();
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  loadPage(pagedData) {
    
    if (pagedData.totalPages != 0 && pagedData.number >= pagedData.totalPages) {
      this.page.totalPages = pagedData.totalPages;
      this.parent.makeRequestHttp();
    } else {      
      this.page.pageNumber = pagedData.number;
      this.page.totalPages = pagedData.totalPages;
      this.page.totalElements = pagedData.totalElements;
      this.page.size = pagedData.size;
      this.rows = pagedData.content;
    }
  }

  showLoadIndicator(bool){  
    this.loadindicator = bool;
  }
  
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.parent.makeRequestHttp();
  }

  setSort(sortInfo) {
    this.sorts = sortInfo.sorts;
    this.parent.makeRequestHttp();
  }

  setSearch(search) {
    this.search = search;
    this.setPage({ offset: 0 });
  }
  
  getParams(filterParam?) {
    let filter = {
      numeroPagina: this.page.pageNumber,
      numeroResultados: (this.appService.isMobile ? 1000000 : this.page.size),
      ordem: this.getSort(),
      //camposPesquisa: this.getSearchFilelds(),
      pesquisa: !this.search ? null : this.search
    }

    if (filterParam) {
      Object.keys(filterParam).forEach(
        key => {
          filter[key] = filterParam[key];
        });
    }
    return filter;
  }

  getSort() {
    let sort = '';

    for (let i = 0; i < this.sorts.length; i++) {
      if (sort) sort += ',';
      sort += this.sorts[i].prop + ' ' + this.sorts[i].dir;
    }

    return sort;
  }

  getSearchFilelds() {
    let searchFields = '';

    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].searchable) {
        if (searchFields) searchFields += ';';
        searchFields += this.columns[i].prop;
      }
    }

    return searchFields;
  }

  //Realiza o tratamento da informação conforme clique na linha
  onDatatableLineClick(event) {       
    if(event.type == 'click') {        
      if (this.columns[event.cellIndex].type != ColumnType.COLUMN_ACTIONS){
        this.dataTableLineClick.emit(event.row);        
      }
    }
  }

  view(row) {
    this.parent.view(row[this.columns.find(column => column.databaseidentifier === true).prop]);
  }

  edit(row) {
    this.parent.edit(row.id);    
  }

  download(row) {
    this.parent.download(row[this.columns.find(column => column.databaseidentifier === true).prop]);
  }

  openMap(row) {
    this.parent.openMap(row);
  }

  syncWithServer(row) {
    this.parent.syncWithServer(row);
  }

  delete(row) {
    this.parent.delete(row.id);
  }

  contabilizacao(row) {
    this.parent.contabilizacao(row[this.columns.find(column => column.databaseidentifier === true).prop]);
  }

  changepass(row) {
    this.parent.changepass(row[this.columns.find(column => column.databaseidentifier === true).prop]);
  }

  print(row){
    this.parent.print(row[this.columns.find(column => column.databaseidentifier === true).prop]);
  }

  star(row){
    this.parent.star(row[this.columns.find(column => column.databaseidentifier === true).prop]);
  }
}