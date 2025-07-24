import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Datatable } from './datatable.component';
import { DatatableC } from './datatableC.component';
import { DatatableSearch } from './datatable-search.component';
import { DatatableCompl } from './datatable-compl.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [
    Datatable,
    DatatableC,
    DatatableSearch,
    DatatableCompl
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    ConfirmationPopoverModule.forRoot({
      cancelButtonType: 'default btn-md',
      confirmButtonType: 'danger btn-md'
    })
  ],
  exports: [
    NgxDatatableModule,
    Datatable,
    DatatableC,
    DatatableSearch,
    DatatableCompl
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatatableModule { }