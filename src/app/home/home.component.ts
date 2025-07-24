import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { LayoutService } from '../layout/layout.service';
import { Router } from '@angular/router';
import { AuthorityTypes, NiveisAcessoActionsENUM } from '../shared/app.constants';
import { BlockUiComponent } from '../../components/block-ui/block-ui.component';
import { ImportadorDespesasRotasENUM } from '../shared/app.routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    '../../vendor/libs/ngx-swiper-wrapper/ngx-swiper-wrapper.scss',
    'home.scss'
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('pageblockUI') pageblockUI: BlockUiComponent;
  
  public authorityTypes = AuthorityTypes;
  public niveisAcessoActionsENUM = NiveisAcessoActionsENUM;
  public importadorDespesasRoutes = ImportadorDespesasRotasENUM
  
  constructor(public appService: AppService,    
              public router: Router,
              public layoutService: LayoutService) {
    this.appService.pageTitle = 'Principal';
  }

  ngOnInit(): void {    
    //Prepara as chamadas HTTP
    this.prepareHttpRequests();     
    
  }

  private prepareHttpRequests() : void{
    
  }

  public abrirevento():void{
    this.router.navigate(['/evento']);
  }
}
