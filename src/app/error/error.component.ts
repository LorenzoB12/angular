import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {

  constructor(private appService: AppService) {
    this.appService.pageTitle = '404 - Não Encontrado';
  }

}
