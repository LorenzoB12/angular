import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule as Ng2FileUploadModule } from 'ng2-file-upload';

import { FileUpload } from './file-upload.component';

@NgModule({
  declarations: [
    FileUpload
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2FileUploadModule
  ],
  exports: [
    Ng2FileUploadModule,
    FileUpload
  ]
})
export class FileUploadModule { }