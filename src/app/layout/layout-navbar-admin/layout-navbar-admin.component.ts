import { Component, Input, HostBinding, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-layout-navbar-admin',
  templateUrl: './layout-navbar-admin.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarAdminComponent{  
  isExpanded = false;
  isRTL: boolean;
  
  emailLogado : string = "";

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
