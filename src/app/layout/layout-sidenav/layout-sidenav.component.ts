import { Component, Input, ChangeDetectionStrategy, AfterViewInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { LayoutService } from '../layout.service';
import { NiveisAcessoActionsENUM } from '../../shared/app.constants';
import { ImportadorDespesasRotasENUM } from '../../shared/app.routes';
import { ToastrService } from '../../services/toastr.service';
import { version } from './../../../../package.json';

@Component({
  selector: 'app-layout-sidenav',
  templateUrl: './layout-sidenav.component.html',
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSidenavComponent implements AfterViewInit {
  public niveisAcessoActionsENUM = NiveisAcessoActionsENUM;
   
  isExpanded = true;
  @Input() orientation = 'vertical';

  @HostBinding('class.layout-sidenav') private hostClassVertical = false;
  @HostBinding('class.layout-sidenav-horizontal') private hostClassHorizontal = false;
  @HostBinding('class.flex-grow-0') private hostClassFlex = false;

  constructor(private router : Router, private route: ActivatedRoute, public appService: AppService, private layoutService: LayoutService, private toastrService: ToastrService ) {
    // Set host classes
    this.hostClassVertical = this.orientation !== 'horizontal';
    this.hostClassHorizontal = !this.hostClassVertical;
    this.hostClassFlex = this.hostClassHorizontal;
  }

  ngAfterViewInit() {
    // Safari bugfix
    this.layoutService._redrawLayoutSidenav();    
  }

  getClasses() {
    let bg = this.appService.layoutSidenavBg;

    if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
      bg = bg
        .replace(' sidenav-dark', '')
        .replace(' sidenav-light', '')
        .replace('-darker', '')
        .replace('-dark', '');
    }

    return `${this.orientation === 'horizontal' ? 'container-p-x ' : ''} bg-${bg}`;
  }

  isActive(url) {   
    return this.router.isActive(url, false);
  }

  isMenuActive(url) {
    return this.router.isActive(url, false);
  }

  isMenuOpen(url) {
    return this.router.isActive(url, false) && this.orientation !== 'horizontal';
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
    this.isExpanded = !this.isExpanded;
  }

  /**
   * Utilizado para apresentar ou não o badge "novo" ao usuário. Importante para deixar destacado os itens.
   * @param vs 
   */
  public showNewBadge(vs : string) : boolean{
     if (version === vs){
        return true;
     } else {
      return false;
     }
  }
}
