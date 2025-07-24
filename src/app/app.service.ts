import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Service } from './services/service';
import { Http } from '@angular/http';
import { AuthorityTypes } from './shared/app.constants';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AppService extends Service {
  private tokenDecoded  : any;
  private resourceTokenDecoded  : any;
  public appname : String = environment.APPNAME;
  public version : string = "N/A";
  public totalnotificacoes : number = 0;
  private authorityTypes = AuthorityTypes;
  public  ipAddress = '';
  
  constructor(private titleService: Title, private http: Http) {
    super();    
  }

  public reloadCurrentRoute(router: Router) {
    const currentUrl = router.url;
    router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        router.navigate([currentUrl]);
    });
  }

  get isMobile(){
    return window.matchMedia("only screen and (max-width: 760px)").matches;
  }

  // Set page title
  set pageTitle(value: string) {
    this.titleService.setTitle(`${value} - `+this.appname);
  }

  // Check for RTL layout
  get isRTL() {
    return document.documentElement.getAttribute('dir') === 'rtl' ||
           document.body.getAttribute('dir') === 'rtl';
  }

  // Check if IE10
  get isIE10() {
    return typeof document['documentMode'] === 'number' && document['documentMode'] === 10;
  }

  // Layout navbar color
  get layoutNavbarBg() {
    return 'navbar-theme';
  }

  // Layout sidenav color
  get layoutSidenavBg() {
    return 'sidenav-theme';
  }

  // Layout footer color
  get layoutFooterBg() {
    return 'footer-theme';
  }

  // Animate scrollTop
  scrollTop(to: number, duration: number, element = document.scrollingElement || document.documentElement) {
    if (element.scrollTop === to) { return; }
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) { return c / 2 * t * t + b; }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = function() {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };

    animateScroll();
  }


  get getAssetsPath(){
    return environment.assetPath;    
  }

  downloadFileCSV(data, filename='data',headerList:Array<string>, nameColumnsList:Array<string>) {
    let csvData = this.ConvertToCSV(data, headerList,nameColumnsList);

    let blob     = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url      = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray, headerList, nameHeaderList) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str   = '';
     let row   = '';
     /* NÃO É NECESSÁRIO APRESENTAR O CABEÇALHO
     for (let index in nameHeaderList) {
         row += nameHeaderList[index] + ';';
     }
     row  = row.slice(0, -1);

     str += row + '\r\n'; */
     for (let i = 0; i < array.length; i++) {
         let line = '';
         for (let index in headerList) {
            let head = headerList[index];
            line += array[i][head] + ';';
         }
         str += line + '\r\n';
     }
    
    return str;
 }

 validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g,'');
  if(cpf == '') return false;
  if (cpf.length != 11 || 
      cpf == "00000000000" || 
      cpf == "11111111111" || 
      cpf == "22222222222" || 
      cpf == "33333333333" || 
      cpf == "44444444444" || 
      cpf == "55555555555" || 
      cpf == "66666666666" || 
      cpf == "77777777777" || 
      cpf == "88888888888" || 
      cpf == "99999999999")
      return false;
  // Validação dos dígitos verificadores
  let add = 0;
  for (let i=0; i < 9; i ++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
      rev = 0;
  if (rev != parseInt(cpf.charAt(9)))
      return false;
  add = 0;
  for (let i = 0; i < 10; i ++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
      rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
      return false;
  return true;
}

validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g,'');
  if(cnpj == '') return false;
  if (cnpj.length != 14)
      return false;
  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" || 
      cnpj == "11111111111111" || 
      cnpj == "22222222222222" || 
      cnpj == "33333333333333" || 
      cnpj == "44444444444444" || 
      cnpj == "55555555555555" || 
      cnpj == "66666666666666" || 
      cnpj == "77777777777777" || 
      cnpj == "88888888888888" || 
      cnpj == "99999999999999")
      return false;
  // Valida DVs
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0,tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
      soma += parseInt( numeros.charAt(tamanho - i) )  * pos--;
      if (pos < 2)
          pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado.toString() != digitos.charAt(0))
      return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
      soma +=  parseInt(numeros.charAt(tamanho - i))  * pos--;
      if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado.toString() != digitos.charAt(1))
      return false;
  return true;
}

}
