import { Component, HostBinding } from '@angular/core';
import { AppService } from '../../app.service';
import { version } from './../../../../package.json';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styles: [':host { display: block; }']
})
export class LayoutFooterComponent {
  @HostBinding('class.layout-footer') private hostClassMain = true;
  public version : string;

    constructor(public appService: AppService) {
    this.version = `F${version}-B${this.appService.version}`;
  }

  currentBg() {
    return `bg-${this.appService.layoutFooterBg}`;
  }

  appname() : String {
    return this.appService.appname
  }
}
