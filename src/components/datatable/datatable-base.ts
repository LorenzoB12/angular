import { ViewChild, Input } from '@angular/core';

import { Action } from './action';
import { Page } from './page';
import { ColumnType } from './column-type';
import { DatatableCompl } from './datatable-compl.component';
import { Shortcuts } from './shortcuts';

export class DatatableBase {

  @Input() limit;

  @ViewChild('datatableCompl') datatableCompl: DatatableCompl;

  messages = { emptyMessage: 'Nenhum registro encontrado!', totalMessage: 'Total', loadingMessage:'Buscando Dados...' };
  search: string;
  sorts: Array<any>;
  rows: Array<any>;
  columns: Array<any>;
  page: Page;
  loadindicator : boolean;

  btnView: boolean;
  btnEdit: boolean;
  btnDelete: boolean;
  btnAccount: boolean;
  btnVouchers: boolean;
  btnChangePass : boolean;
  btnBlock : boolean;
  btnStar : boolean;
  btnOpenMap : boolean;
  btnSyncWithServer : boolean;
  btnDownload : boolean;
  btnPrint : boolean;

  //Shortcuts
  btnNegativeAction: boolean;
  btnPositiveAction: boolean;

  constructor() {
    this.limit = 10;

    //Actions
    this.btnView = false;
    this.btnEdit = false;
    this.btnDelete = false;
    this.btnAccount = false;
    this.btnVouchers = false;
    this.btnChangePass = false;
    this.btnBlock      = false;
    this.btnStar       = false;
    this.btnOpenMap    = false;
    this.btnSyncWithServer = false;
    this.btnDownload       = false;
    this.btnPrint       = false;

    //Shortcuts
    this.btnPositiveAction = false;
    this.btnNegativeAction = false;

    this.init();
  }

  init() {
    this.search = '';
    this.sorts = [];
    this.rows = [];
    this.columns = [];
    this.page = new Page(this.limit);
    this.loadindicator = true;
  }

  addColumn(column: any) {
    column.headerClass = 'text-center';
    column.cellClass = 'text-center';

    if (column.prefixText === undefined){
      column.prefixText = "";
    }    

    if (column.posfixText === undefined){
      column.posfixText = "";
    }  
    
    //Para que possamos marcar o campo que é PK na tabela, para facilitar os trabalhos e não forçar sempre campo com nome ID.    
    if (!!!column.databaseidentifier) {
      column.databaseidentifier = false; 
    }    

    if (column.sort) this.sorts.push({ prop: column.prop, dir: column.sort });
    if (column.sortable !== false) column.sortable = true;
    if (column.searchable !== false) column.searchable = true;
    if (!column.resizeable) column.resizeable = false;

    if (column.type) {
      if (column.type == ColumnType.COLUMN_STRING) {
        column.headerClass = 'text-left';
        column.cellClass = 'text-left';
      }
     
      if (column.type == ColumnType.COLUMN_DOUBLE) {
        column.headerClass  = 'text-center';
        column.cellClass    = 'text-right';                
        column.cellTemplate = this.datatableCompl.doubleColumnTmpl;
      }

      if (column.type == ColumnType.COLUMN_DATE) {
        column.cellTemplate = this.datatableCompl.dateColumnTmpl;
      }
      if (column.type == ColumnType.COLUMN_DATETIME) {
        column.cellTemplate = this.datatableCompl.dateTimeColumnTmpl;
      }
      if (column.type == ColumnType.COLUMN_BOOLEAN) {
        column.cellTemplate = this.datatableCompl.booleanColumnTmpl;
      }
      if (column.type == ColumnType.COLUMN_LABEL) {
        column.cellTemplate = this.datatableCompl.labelColumnTmpl;
        column.sortable = false;
        column.searchable = false;
      }
      if (column.type == ColumnType.COLUMN_CHECK) {
        column.cellTemplate = this.datatableCompl.checkColumnTmpl;
        column.sortable = false;
        column.searchable = false;
      }
      if (column.type == ColumnType.COLUMN_INSCR) {
        column.cellTemplate = this.datatableCompl.inscrColumnTmpl;
        column.headerClass = 'text-left';
        column.cellClass = 'text-left';
      }
      if (column.type == ColumnType.COLUMN_INLINEGRAPH) {
        column.cellTemplate = this.datatableCompl.inlineGraphColumnTmpl;
        column.sortable = false;
        column.searchable = false;
      }
    }
    this.columns.push(column);
  }

  addActionsColumn(actions: any = []) {
    let maxWidth = 10;

    this.btnView = (actions.indexOf(Action.VIEW) != -1);
    this.btnEdit = (actions.indexOf(Action.EDIT) != -1);
    this.btnAccount = (actions.indexOf(Action.ACCOUNT) != -1);
    this.btnVouchers = (actions.indexOf(Action.VOUCHERS) != -1);
    this.btnDelete = (actions.indexOf(Action.DELETE) != -1);
    this.btnChangePass = (actions.indexOf(Action.CHANGEPASS) != -1);
    this.btnBlock = (actions.indexOf(Action.BLOCK) != -1);
    this.btnStar = (actions.indexOf(Action.STAR) != -1);
    this.btnOpenMap = (actions.indexOf(Action.OPENMAP) != -1);
    this.btnSyncWithServer = (actions.indexOf(Action.SYNCWITHSERVER) != -1);
    this.btnDownload = (actions.indexOf(Action.DOWNLOAD) != -1);
    this.btnPrint = (actions.indexOf(Action.PRINT) != -1);

    maxWidth += this.btnView ? 50 : 0;
    maxWidth += this.btnEdit ? 50 : 0;
    maxWidth += this.btnDelete ? 50 : 0;
    maxWidth += this.btnAccount ? 50 : 0;
    maxWidth += this.btnChangePass ? 50 : 0;
    maxWidth += this.btnBlock ? 50 : 0;
    maxWidth += this.btnStar ? 50 : 0;
    maxWidth += this.btnOpenMap ? 50 : 0;
    maxWidth += this.btnSyncWithServer ? 50 : 0;
    maxWidth += this.btnDownload ? 50 : 0;
    maxWidth += this.btnPrint ? 50 : 0;

    if (maxWidth > 0)
      this.columns.push({
        name: 'Ações',
        maxWidth: maxWidth,
        headerClass: 'text-center',
        cellClass: 'text-center',
        sortable: false,
        resizeable: false,
        cellTemplate: this.datatableCompl.actionsColumnTmpl,
        type: ColumnType.COLUMN_ACTIONS
      });
  }

  addShortcutColumn(shortcuts: any = []) {
    let maxWidth = 15;

    this.btnPositiveAction = (shortcuts.indexOf(Shortcuts.POSITIVEACTION) != -1);
    this.btnNegativeAction = (shortcuts.indexOf(Shortcuts.NEGATIVEACTION) != -1);    

    maxWidth += this.btnPositiveAction ? 50 : 0;
    maxWidth += this.btnNegativeAction ? 50 : 0;

    if (maxWidth > 0)
      this.columns.push({
        name: 'Atalhos',
        maxWidth: maxWidth,
        headerClass: 'text-center',
        cellClass: 'text-center',
        sortable: false,
        resizeable: false,
        cellTemplate: this.datatableCompl.shortcutsColumnTmpl,
        type: ColumnType.COLUMN_ACTIONS
      });
  }
}