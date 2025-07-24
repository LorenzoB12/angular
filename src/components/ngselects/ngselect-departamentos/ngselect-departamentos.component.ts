import { Component, OnInit, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
    selector: 'app-ngselect-departamentos',
    templateUrl: './ngselect-departamentos.component.html',  
    providers: [{
         provide: NG_VALUE_ACCESSOR,
         useExisting: NgselectDepartamentosComponent,
         multi: true
       }]
  })
  export class NgselectDepartamentosComponent implements OnInit, ControlValueAccessor {
    @Input("itens")itens : Array<any> = new Array<any>()
    @Input() initialValue: any; // Nova entrada para o valor inicial
    selectedItem: any;
      
    public typeToSearchText = "Digite algo para pesquisar..."
    public loadingText  = "Buscando Registros..."
    public notFoundText = "Nenhum item encontrado"
    public clearAllText = "Limpar Seleção"
    public placeholder  = "Digite o Departamento"
    public selectLoading = false
    public minCharactersToSearch = 1
    onChange: any = () => {};
    onTouched: any = () => {};
    value: any;
  
    constructor() { }
  
    writeValue(obj: any): void {
        if(obj){
            this.selectedItem = obj
        }
       this.value = obj;
    }
    registerOnChange(fn: any): void {
      this.onChange = fn;    
    }
    registerOnTouched(fn: any): void {
      this.onTouched = fn;    
    }
    setDisabledState?(isDisabled: boolean): void {
      throw new Error('Method not implemented.');
    }
  
    ngOnInit() {    
      if (this.initialValue) {
        this.selectedItem = this.initialValue; // Define o valor inicial se fornecido
      }
     }
  }
  