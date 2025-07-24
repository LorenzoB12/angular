import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

const DT_FORMAT: string = 'DD/MM/YYYY';;

@Component({
  selector: 'ngbdatepicker',
  templateUrl: './ngbdatepicker.component.html',
  styleUrls: ['../../vendor/libs/ngb-datepicker/ngb-datepicker.scss'],
  styles: ['ngb-datepicker { top: 33px !important; }'],
})
export class NgbdatepickerComponent extends NgbDateParserFormatter {
  mask = [/\d/, /\d/, '/', /[\d]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  valueInput: string;
  inputValue: NgbDateStruct;

  @Output() valueChange = new EventEmitter();  
  @Input() required: boolean = false;
  @Input() formName: string;    
  @Input() minPickerDate = { year: 2000, month: 1, day: 2};
  @Input() maxPickerDate = { year: 2030, month: 1, day: 2};
  @Input()
  set value(value: any) {
    this.valueInput = this.format(value);
    this.inputValue = value;
    this.valueChange.emit(value);
  }
  get value(): any {
    return this.inputValue;
  }

  constructor(private calendar: NgbCalendar) {
    super();
  }

  parse(value: string): NgbDateStruct {
    throw new Error("Method not implemented.");
  }

  format(date): string {
    if (!date) return '';
    let dateString: string = String(date);
    let mdt = moment(dateString.substring(8, 10) + '/' + dateString.substring(5, 7) + '/' + dateString.substring(0, 4), DT_FORMAT);
    if (!mdt.isValid()) return '';
    return mdt.format(DT_FORMAT);
  }

  onBlur(date: string) {
    if (moment(date, DT_FORMAT).isValid() && !!Number(date.substring(0, 2)) && !!Number(date.substring(3, 5)) && !!Number(date.substring(6, 10))) {
      const dataValid = date.substring(6, 10) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2)
      if (this.biggerThan(dataValid, '1900-01-01')) {
        this.value = dataValid;
        return;
      }
    }
    this.value = null;
    this.valueInput = '';
  }

  selectToday() {
    this.value = this.getToday();    
  }

  getToday() {
    const today: NgbDateStruct = this.calendar.getToday();
    return today.year.toString() + '-' + String('00' + today.month).slice(-2) + '-' + String('00' + today.day).slice(-2);
  }

  //CREATE DATE UTILS
  DATE_FORMAT: string = 'YYYY-MM-DD';
  biggerThan(endDate: string, startDate: string) {
    if (!endDate) return true;
    if (!startDate) return false;
    return moment(endDate, this.DATE_FORMAT) > moment(startDate, this.DATE_FORMAT);
  }

  after(endDate: string, startDate?: string) {
    if (!endDate) return true;
    if (!startDate) {
      startDate = this.getToday();
    }
    return moment(endDate, this.DATE_FORMAT) > moment(startDate, this.DATE_FORMAT);
  }

  difYearsToday(date: string) {
    if (!date) return 0;
    return moment(this.getToday(), this.DATE_FORMAT).diff(moment(date, this.DATE_FORMAT), 'years');
  }

  equals(date1: string, date2?: string) {
    if (!date2) {
      date2 = this.getToday();
    }
    if (!date1 || !date2) return false;
    return moment(date1, this.DATE_FORMAT) > moment(date2, this.DATE_FORMAT);
  }
}
