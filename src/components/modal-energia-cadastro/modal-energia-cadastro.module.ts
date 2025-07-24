import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectDepartamentosModule } from '../ngselects/ngselect-departamentos/ngselect-departamentos.module';
import { NgSelectDespesasModule } from '../ngselects/ngselect-despesas/ngselect-despesas.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatePickerModule } from '../ngbdatepicker/ngbdatepicker.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ModalEnergiaCadastroComponent } from './modal-energia-cadastro.component';

@NgModule({
  declarations: [
    ModalEnergiaCadastroComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    NgbModule,    
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectDepartamentosModule,
    NgSelectDespesasModule,
    NgSelectModule, 
    NgbDatePickerModule,
    TextMaskModule,
  ],
  exports: [
    ModalEnergiaCadastroComponent
  ]
})
export class ModalEnergiaComponentModule { }