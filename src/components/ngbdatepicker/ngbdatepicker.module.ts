import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDateAdapter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgbUTCStringAdapter } from './NgbUTCStringAdapter';
import { CustomDatepickerI18n, I18n } from './CustomDatepickerI18n';
import { NgbdatepickerComponent } from './ngbdatepicker.component';


@NgModule({
  declarations: [
    NgbdatepickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    NgbModule
  ],
  exports: [
    NgbdatepickerComponent
  ],
  providers: [
    [{ provide: NgbDateAdapter, useClass: NgbUTCStringAdapter }],
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
  ]
})
export class NgbDatePickerModule { }
