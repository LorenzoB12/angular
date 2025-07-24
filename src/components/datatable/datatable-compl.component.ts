import { Component, TemplateRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'datatable-compl',
  templateUrl: './datatable-compl.template.html'
})
export class DatatableCompl {

  @Input() parent: any;

  //@ViewChild('confirmModal') confirmModal: ConfirmModal;
  @ViewChild('checkColumn') checkColumnTmpl: TemplateRef<any>;
  @ViewChild('labelColumn') labelColumnTmpl: TemplateRef<any>;
  @ViewChild('shortcutsColumn') shortcutsColumnTmpl: TemplateRef<any>;
  @ViewChild('actionsColumn') actionsColumnTmpl: TemplateRef<any>;
  @ViewChild('dateColumn') dateColumnTmpl: TemplateRef<any>;
  @ViewChild('doubleColumn') doubleColumnTmpl: TemplateRef<any>;
  @ViewChild('dateTimeColumn') dateTimeColumnTmpl: TemplateRef<any>;
  @ViewChild('booleanColumn') booleanColumnTmpl: TemplateRef<any>;
  @ViewChild('inscrColumn') inscrColumnTmpl: TemplateRef<any>;
  @ViewChild('inlineGraphColumnTmpl') inlineGraphColumnTmpl: TemplateRef<any>;

  row: any;

  constructor() { }

  confirmModalDelete(row: any) {
    this.row = row;
    //this.confirmModal.show();
  }

  alterCheck(row: any, prop: string) {
    row[prop] = !row[prop];
  }

}