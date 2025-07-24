import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgselectDespesasComponent } from "./ngselect-despesas.component";

@NgModule({
    imports: [
        CommonModule,
        NgSelectModule,
        FormsModule
    ],
    exports: [NgselectDespesasComponent],
    declarations: [NgselectDespesasComponent]
  })
  export class NgSelectDespesasModule { }