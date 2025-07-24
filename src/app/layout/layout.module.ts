import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// *******************************************************************************
// Layouts

import { Layout2Component } from './layout-2/layout-2.component';
import { LayoutBlankComponent } from './layout-blank/layout-blank.component';



// *******************************************************************************
// Components

import { LayoutNavbarComponent } from './layout-navbar/layout-navbar.component';
import { LayoutSidenavComponent } from './layout-sidenav/layout-sidenav.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';


// *******************************************************************************
// Libs

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidenavModule } from './../../vendor/libs/sidenav/sidenav.module';


// *******************************************************************************
// Services

import { LayoutService } from './layout.service';
import { Layout1Component } from './layout-1/layout-1.component';
import { LayoutWithoutNavbarComponent } from './layout-without-navbar/layout-without-navbar.component';
import { LayoutWithoutSidenavComponent } from './layout-without-sidenav/layout-without-sidenav.component';
import { Layout2AdminComponent } from './layout-2-admin/layout-2-admin.component';
import { LayoutNavbarAdminComponent } from './layout-navbar-admin/layout-navbar-admin.component';
import { LayoutSidenavAdminComponent } from './layout-sidenav-admin/layout-sidenav-admin.component';
import { LayoutNavbarSimpleComponent } from './layout-navbar-simple/layout-navbar-simple.component';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    SidenavModule    
  ],
  declarations: [  
    Layout1Component,    
    Layout2Component,    
    Layout2AdminComponent,    
    LayoutBlankComponent,
    LayoutWithoutNavbarComponent,
    LayoutWithoutSidenavComponent,    
    LayoutNavbarComponent,
    LayoutNavbarAdminComponent,
    LayoutNavbarSimpleComponent,
    LayoutSidenavComponent,
    LayoutSidenavAdminComponent,
    LayoutFooterComponent
  ],
  providers: [
    LayoutService
  ]
})
export class LayoutModule { }
