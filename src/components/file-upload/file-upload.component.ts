import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { environment } from './../../environments/environment';

declare let $: any;

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.template.html',
  styleUrls: [
    './../../vendor/libs/ngx-dropzone-wrapper/ngx-dropzone-wrapper.scss',
    './file-upload.scss'
  ]
})
export class FileUpload implements OnInit {

  @Input() env: boolean = true;
  @Input() endpoint: string;
  @Input() multiple: boolean = true;
  @Input() maxFiles: number;
  @Input() allowedFileType: string[];

  @Output() onSuccessItem = new EventEmitter();
  @Output() onErrorItem = new EventEmitter();
  @Output() onRemoveFromQueue = new EventEmitter();
  @Output() onClearQueue = new EventEmitter();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  constructor(public elementRef: ElementRef) { }

  ngOnInit() {
    this.initOpen();
  }

  initOpen() {
    this.uploader = new FileUploader({});
    this.uploader.options.url = this.env ? environment.apiUrl + this.endpoint : this.endpoint;
    this.uploader.authTokenHeader = 'Authorization';
    this.uploader.authToken = 'Bearer '+ localStorage.getItem('access_token');
    this.uploader.options.method = 'POST'
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onErrorItem = (item, response) => { this.onErrorItem.emit(response); };
    this.uploader.onSuccessItem = (item, response) => { this.onSuccessItem.emit(response); };
    if (this.maxFiles) this.uploader.options.queueLimit = this.maxFiles;
    if (this.allowedFileType) this.uploader.options.allowedFileType = this.allowedFileType;
  }

  removeFromQueue(item) {
    this.onRemoveFromQueue.emit(item);
  }

  clearQueue() {
    this.onClearQueue.emit();
  }

  fileOver(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  openSelect() {
    $(this.elementRef.nativeElement).find('#select').click();

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      file.upload();
    };
  }

}