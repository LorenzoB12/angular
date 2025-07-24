import { Component, Input, HostBinding, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-layout-navbar-simple',
  templateUrl: './layout-navbar-simple.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarSimpleComponent  {    
  isExpanded = false;
  isRTL: boolean;
  
  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') private hostClassMain = true;
  
  constructor(public router: Router, 
              public appService: AppService, 
              private layoutService: LayoutService, 
              private cdr: ChangeDetectorRef) {
    this.isRTL = appService.isRTL;    
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  public redirectTo(url : String){
    this.router.navigate([url]);
  }
}
