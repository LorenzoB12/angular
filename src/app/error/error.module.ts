import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ErrorComponent } from './error.component';

import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        ErrorRoutingModule
    ],
    declarations: [
        ErrorComponent
    ]
})
export class ErrorModule { }
