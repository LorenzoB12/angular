import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpModule } from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';

// *******************************************************************************
// Libs

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BlockUiComponentModule } from '../../components/block-ui/block-ui.modules';
import { SwiperModule } from 'ngx-swiper-wrapper';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TextMaskModule,
    HttpModule,
    Ng2ChartsModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NgSelectModule,    
    BlockUiComponentModule,
    SwiperModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
