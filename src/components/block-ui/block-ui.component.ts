import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'app-block-ui',
    templateUrl: './block-ui.template.html',
    styleUrls: [
      './block-ui.component.scss',
      '../../vendor/libs/spinkit/spinkit.scss',
    ],
    encapsulation: ViewEncapsulation.None
  })
export class BlockUiComponent {
  @BlockUI() blockUIPage: NgBlockUI;

  constructor() { }

  @Input() showText: string;

  startBlock(){
    this.blockUIPage.start();
  }

  stopBlock(){
    this.blockUIPage.stop();
  }

}
