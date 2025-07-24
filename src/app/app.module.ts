import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService as NgxToastrService, ToastrModule } from 'ngx-toastr';
import { ToastrService } from './services/toastr.service';

// *******************************************************************************
// NgBootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';

// *******************************************************************************
// Pages
import { Page2Component } from './page-2/page-2.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BlockUIModule } from 'ng-block-ui';

// *******************************************************************************
//

import localePT from '@angular/common/locales/pt';
import localePTExtra from '@angular/common/locales/extra/pt';
registerLocaleData(localePT, 'pt', localePTExtra)

@NgModule({
  declarations: [
    AppComponent,
    // Pages    
    Page2Component
  ],

  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot({
      toastClass: 'toast'
    }),
    BlockUIModule.forRoot(),
    HttpModule,    
    // App
    AppRoutingModule,
    LayoutModule        
  ],

  providers: [    
    NgxToastrService,
    ToastrService,
    Title,
    AppService,

    { provide: LOCALE_ID, useValue: "pt-br" }
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
