import { Injectable, OnInit } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';

@Injectable()
export class ToastrService implements OnInit {

  private options = {
    enableHtml: true,
    progressBar: true,
    positionClass: 'toast-top-full-width'
  };

  private optionsFixed = {
    enableHtml: true,
    tapToDismiss: true,
    disableTimeOut: true
  };

  constructor(public toastrService: NgxToastrService) { }

  ngOnInit() {
    this.toastrService.toastrConfig.newestOnTop = true;
    this.toastrService.toastrConfig.preventDuplicates = false;
  }

  show(type, message, title, fixed) {
    return this.toastrService[type](message, title, !fixed ? this.options : this.optionsFixed);
  }

  clear() {
    this.toastrService.clear();
  }

  remove(id) {
    this.toastrService.remove(id);
  }

  success(message, title = null, fixed?) {
    return this.show('success', message, title, fixed);
  }

  info(message, title = null, fixed?) {
    return this.show('info', message, title, fixed);
  }

  warning(message, title = null, fixed?) {
    return this.show('warning', message, title, fixed);
  }

  error(message, title = null, fixed?) {
    return this.show('error', message, title, fixed);
  }

  saveSuccess() {
    return this.success('Registro gravado com sucesso!');
  }

  deleteSuccess() {
    return this.success('Registro excluído com sucesso!');
  }

  errorResponse(error: Response) {
    return this.error("Não foi possível realizar a ação. \n Motivo: "+this.getErrorResponse(error));
  }

  getErrorResponse(error: Response) {
    return error.hasOwnProperty('message') ? error['message'] : error.json()['message'];
  }

}