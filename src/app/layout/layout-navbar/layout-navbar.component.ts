import { Component, Input, HostBinding, AfterContentInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';
import { NiveisAcessoActionsENUM, AuthorityTypes } from '../../shared/app.constants';
import { ImportadorDespesasRotasENUM } from '../../shared/app.routes';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: ['./layout-navbar.component.scss']
})
export class LayoutNavbarComponent implements AfterContentInit {  
  isExpanded = false;
  isRTL: boolean;
  
  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') private hostClassMain = true;
  
  constructor(public router: Router, 
              public appService: AppService, 
              private layoutService: LayoutService 
              ) {
    this.isRTL = appService.isRTL;
  }

  ngAfterContentInit(){        
      
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
