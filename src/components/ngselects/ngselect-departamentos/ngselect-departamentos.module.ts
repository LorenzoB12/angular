import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgselectDepartamentosComponent } from "./ngselect-departamentos.component";

@NgModule({
    imports: [
        CommonModule,
        NgSelectModule,
        FormsModule
    ],
    exports: [NgselectDepartamentosComponent],
    declarations: [NgselectDepartamentosComponent]
  })
  export class NgSelectDepartamentosModule { }