import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlockUiComponent } from './block-ui.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    BlockUiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule.forRoot()
  ],
  exports: [
    BlockUiComponent
  ]
})
export class BlockUiComponentModule { }