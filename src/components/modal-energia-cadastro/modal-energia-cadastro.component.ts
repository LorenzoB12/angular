import { Component, Injectable, TemplateRef, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbDatepickerNavigateEvent, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../app/app.service';
import { ProjectMask } from '../../app/shared/app.masks';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, switchMap } from 'rxjs/operators';
import { ToastrService } from '../../app/services/toastr.service';
import { ProjectFunctions } from '../../app/shared/app.functions';
import { DepartamentosXDespesasService } from '../../app/services/departamentoxdespesas.service';
import { CentroCustoService } from '../../app/services/centrocusto.service';
import { constantSimNaoENUM, constantTipoOcorrenciaENUM } from '../../app/shared/app.constants';
import { CentroCustoDesenvolvimento } from '../../app/model/centrocusto-desenvolvimento.model';
import { DatabaseDatePipe } from '../../pipes/databasedate.pipe';
import { EnergiaService } from '../../app/services/energia.service';
import { TransacoesService } from '../../app/services/transacoes.service';
import { DespesasEnergia } from '../../app/model/despesasenergia.model';

@Component({
    selector: 'modal-energia-cadastro',
    templateUrl: './modal-energia-cadastro.template.html',
    providers:[EnergiaService, DepartamentosXDespesasService, TransacoesService, CentroCustoService, DatabaseDatePipe,]
  })
@Injectable()
export class ModalEnergiaCadastroComponent implements OnInit{ 
 @ViewChild('modalEnergiaCadastro') private modalContent: TemplateRef<ModalEnergiaCadastroComponent>;
 @Output('atualizarTela') eventEmitAtualizarTela = new EventEmitter();
  private modalRef: NgbModalRef;

  public projectMask = new ProjectMask();
  public despesa: DespesasEnergia = new DespesasEnergia();
  public projectFunctions = new ProjectFunctions();
  public listSimNao = constantSimNaoENUM;
  public listTipoOcorrencia = constantTipoOcorrenciaENUM;
  
  private subjectPesquisaDespesa : Subject<number> = new Subject<number>(); //Proxy para utilizarmos na pesquisa
  private despesasObservable : Observable<DespesasEnergia>;

  private subjectPesquisaDepartamentosxDespesas : Subject<string> = new Subject<string>(); //Proxy para utilizarmos na pesquisa
  private departamentosxDespesasObservable : Observable<[]>;
  public itensDepartamentosSelect = [];
  public itensDespesasSelect = [];
  public despesaSelect = null
  public dataMesCompetencia = null//controla o mes e ano de competencia 

  private subjectPesquisaTransacoes : Subject<string> = new Subject<string>(); //Proxy para utilizarmos na pesquisa
  private transacoesObservable : Observable<[]>;
  public listTrasacoes : any[] = [];

  private subjectPesquisaCentroCusto : Subject<string> = new Subject<string>(); //Proxy para utilizarmos na pesquisa
  private centroCustoObservable : Observable<[]>;
  public listCentroCusto : CentroCustoDesenvolvimento[] = new Array<CentroCustoDesenvolvimento>();
  public centrosCustoSelecionados = []
  public valoresCC = []
  public listaanterior = [];

  private subjectPesquisa : Subject<string> = new Subject<string>(); //Proxy para utilizarmos na pesquisa
  private energiaObservable : Observable<any>;
  public lista = [];
     
  //Reactive Forms - Sera conectado ao formulario - Conectado ao template.
  public formularioEnergiaDespesa : FormGroup = new FormGroup({
    'id': new FormControl(null),
    'codigodepartamento': new FormControl(null,[Validators.required]),
    'departamento': new FormControl(null,[Validators.required]),
    'tipodespesa': new FormControl(null,[Validators.required]),
    'tipoocorrencia': new FormControl(null,[Validators.required]),
    'cnpjcpffornecedor': new FormControl(null,[Validators.required]),
    'nomefornecedor': new FormControl(null,[Validators.required]),
    'valortotal': new FormControl(null,[Validators.required]),
    'valorcc': new FormControl(null),
    'cc': new FormControl(null,[Validators.required]),
    'mescompetencia': new FormControl(null),
    'anocompetencia': new FormControl(null),
    'dataemissaonf': new FormControl(null),
    'datavencimentonf': new FormControl(null),
    'numeronotafiscal': new FormControl(null),
    'numerocontrato': new FormControl(null),
    'descricaodespesa': new FormControl(null),
    'transacoes': new FormControl(null,[Validators.required]),
    'nfeletronicasimnao': new FormControl(null,[Validators.required]),
    'serienf': new FormControl(null),
    'pedidocompra': new FormControl(null),
    'odi': new FormControl(null),
  })

  constructor(private appService: AppService,
              private modalService: NgbModal,
              private toastrService: ToastrService,
              private energiaService: EnergiaService,
              private departamentoxdespesasService: DepartamentosXDespesasService,
              private transacoesService: TransacoesService,
              private centroCustoService: CentroCustoService,
              private databaseDatePipe : DatabaseDatePipe, 
              ){
  this.appService.pageTitle = 'Cadastro de Despesas';
  }
  ngOnInit(): void {
    //Prepara as chamadas HTTP
    this.prepareHttpRequests();
    this.makeHttpRequets();
  }

  makeHttpRequets(){
    this.subjectPesquisaDepartamentosxDespesas.next("");
    this.subjectPesquisaTransacoes.next("");
    this.subjectPesquisaCentroCusto.next("");
    this.subjectPesquisa.next("");
  }

  private prepareHttpRequests() : void{
    //despesas energia cadastradas
    this.energiaObservable = this.subjectPesquisa
    .pipe(
           switchMap(() => {
            return this.energiaService.getListObservable() // Retorna o ApiResponse.
          })
        )

    this.energiaObservable.subscribe(
      (resposta: DespesasEnergia[]) => {
        this.lista = resposta;
      }
    );

     //Despesa
    this.despesasObservable = this.subjectPesquisaDespesa
    .pipe(
            switchMap((id: number) => {
           return this.energiaService.getOne(id) // Retorna o ApiResponse.
          }),
          catchError((erro: any) => {
            return new Observable<DespesasEnergia>(); //Retorna vazio.
          })
        )

    this.despesasObservable.subscribe(
      (resposta : DespesasEnergia) => {
        this.despesa = resposta;
        this.setDataFormulario();
      }
    );
    
     //Departamentos
     this.departamentosxDespesasObservable = this.subjectPesquisaDepartamentosxDespesas
     .pipe(
             switchMap(() => {
            return this.departamentoxdespesasService.getListEnergia();
           }),
           catchError((erro: any) => {
             return new Observable<any>(); //Retorna vazio.
           })
         )
 
     this.departamentosxDespesasObservable.subscribe(
       (resposta : any) => {
         this.itensDepartamentosSelect = resposta.departamentoxdespesas;
        }
     );

     //Transacao
     this.transacoesObservable = this.subjectPesquisaTransacoes
             .pipe(
             switchMap(() => {
            return this.transacoesService.getList()
           }),
           catchError((erro: any) => {
             return new Observable<any>(); //Retorna vazio.
           })
         )
 
     this.transacoesObservable.subscribe(
       (resposta : any) => {
         this.listTrasacoes = resposta.transacoes;
        }
     );

     //Centro de Custo
     this.centroCustoObservable = this.subjectPesquisaCentroCusto
     .pipe(
             switchMap(() => {
            return this.centroCustoService.getListEnergia();
           }),
           catchError((erro: any) => {
             return new Observable<any>(); //Retorna vazio.
           })
         )
 
     this.centroCustoObservable.subscribe(
       (resposta : any) => {
        this.listCentroCusto = resposta.centrocusto
        }
     );
  }

  //Seta as informacoes do tecnico que esta sendo editado
  private setDataFormulario(){   
    let year: number = parseInt(this.despesa.anocompetencia.toString())
    let month:  number =  parseInt(this.despesa.mescompetencia.toString())
    this.dataMesCompetencia = { year: year, month: month, day: 1 }

    if(!!this.despesa && !!this.despesa.valorcc && this.despesa.valorcc.length > 0){
      this.despesa.valorcc.forEach((valor, index)=>{
        this.valoresCC[index] = valor !== null ? this.projectMask.maskValue(valor) : ""
      })
    }

    this.centrosCustoSelecionados = this.despesa.cc
    
    this.formularioEnergiaDespesa.patchValue({
      id : this.despesa.id,
      codigodepartamento : !!this.despesa.codigodepartamento ? this.despesa.codigodepartamento : null,
      departamento  : !!this.despesa.departamento ? this.despesa.departamento : null,
      tipodespesa   : this.despesa.tipodespesa,
      tipoocorrencia   : this.despesa.tipoocorrencia,
      cnpjcpffornecedor   : this.despesa.cnpjcpffornecedor,
      nomefornecedor   : this.despesa.nomefornecedor,
      valortotal   : this.despesa.valortotal  !== null ? this.projectMask.maskValue(this.despesa.valortotal) : "",
      cc   : this.despesa.cc,
      mescompetencia   : this.despesa.mescompetencia,
      anocompetencia   : this.despesa.anocompetencia,
      dataemissaonf   :  this.despesa.dataemissaonf,
      datavencimentonf   : this.despesa.datavencimentonf,
      numeronotafiscal   : this.despesa.numeronotafiscal,
      numerocontrato   : this.despesa.numerocontrato,
      descricaodespesa   : this.despesa.descricaodespesa,
      transacoes   : this.despesa.transacao,
      nfeletronicasimnao   : this.despesa.nfeletronicasimnao,
      serienf   : this.despesa.serienf,
      pedidocompra : this.despesa.pedidocompra,   
      odi : this.despesa.odi
  });
}

private getDataFormulario() : DespesasEnergia{
  let objectDespesa = new DespesasEnergia();
  
  objectDespesa.id = !!this.formularioEnergiaDespesa.value.id ? this.formularioEnergiaDespesa.value.id : new Date().getTime();
  objectDespesa.codigodepartamento = this.formularioEnergiaDespesa.value.codigodepartamento;
  objectDespesa.departamento = this.formularioEnergiaDespesa.value.departamento;      
  objectDespesa.tipodespesa = this.formularioEnergiaDespesa.value.tipodespesa;
  objectDespesa.tipoocorrencia = this.formularioEnergiaDespesa.value.tipoocorrencia;
  objectDespesa.cnpjcpffornecedor = this.formularioEnergiaDespesa.value.cnpjcpffornecedor;
  objectDespesa.nomefornecedor = this.formularioEnergiaDespesa.value.nomefornecedor;
  objectDespesa.valortotal = this.formularioEnergiaDespesa.value.valortotal !== null ? this.projectMask.unmaskNumber(this.formularioEnergiaDespesa.value.valortotal): null;
  objectDespesa.valorcc =  this.valoresCC;
  objectDespesa.cc = this.formularioEnergiaDespesa.value.cc;
  objectDespesa.mescompetencia = this.formularioEnergiaDespesa.value.mescompetencia;
  objectDespesa.anocompetencia = this.formularioEnergiaDespesa.value.anocompetencia;        
  objectDespesa.dataemissaonf = this.formularioEnergiaDespesa.value.dataemissaonf;
  objectDespesa.datavencimentonf = this.formularioEnergiaDespesa.value.datavencimentonf;  
  objectDespesa.numerocontrato = this.formularioEnergiaDespesa.value.numerocontrato;    
  objectDespesa.numeronotafiscal = this.formularioEnergiaDespesa.value.numeronotafiscal;
  objectDespesa.descricaodespesa = this.formularioEnergiaDespesa.value.descricaodespesa;
  objectDespesa.nfeletronicasimnao = this.formularioEnergiaDespesa.value.nfeletronicasimnao;
  objectDespesa.serienf = this.formularioEnergiaDespesa.value.serienf;  
  objectDespesa.transacao = this.formularioEnergiaDespesa.value.transacoes; 
  objectDespesa.pedidocompra = this.formularioEnergiaDespesa.value.pedidocompra;
  objectDespesa.odi = this.formularioEnergiaDespesa.value.odi; 
  
  if(!!this.valoresCC && this.valoresCC.length > 0){
    this.valoresCC.forEach((valor, index)=> {
     objectDespesa.valorcc[index] = this.projectMask.unmaskNumber(valor)})
  }
  
  return objectDespesa;
}

public onSubmit(){
  this.formularioEnergiaDespesa.updateValueAndValidity();

  if (this.formularioEnergiaDespesa.status === 'INVALID'){      
    this.formularioEnergiaDespesa.get('codigodepartamento').markAsTouched();
    this.formularioEnergiaDespesa.get('tipodespesa').markAsTouched();
    this.formularioEnergiaDespesa.get('tipoocorrencia').markAsTouched();
    this.formularioEnergiaDespesa.get('cnpjcpffornecedor').markAsTouched();
    this.formularioEnergiaDespesa.get('nomefornecedor').markAsTouched();
    this.formularioEnergiaDespesa.get('valortotal').markAsTouched();
    this.formularioEnergiaDespesa.get('transacoes').markAsTouched();
    this.formularioEnergiaDespesa.get('nfeletronicasimnao').markAsTouched();
    this.formularioEnergiaDespesa.get('cc').markAsTouched();
      
    this.toastrService.info("O Cadastro não foi preenchido corretamente. Verifique!")
  } else { //Form is Valid
    let valorTotalCC = 0;

    this.valoresCC.forEach((valorcc)=> valorTotalCC += this.projectMask.unmaskNumber(valorcc) );
    if(valorTotalCC == this.projectMask.unmaskNumber(this.formularioEnergiaDespesa.value.valortotal)){
      let existeNotaFiscalCadastrada: boolean = this.lista.some(despesaEnergia => despesaEnergia.numeronotafiscal === this.formularioEnergiaDespesa.value.numeronotafiscal && !!despesaEnergia.numeronotafiscal);

      if(!!this.formularioEnergiaDespesa.value.id){//validação cadastro novo
        if( this.formularioEnergiaDespesa.value.cnpjcpffornecedor.length < 12 && (!this.appService.validarCPF(this.formularioEnergiaDespesa.value.cnpjcpffornecedor)) ){
          this.toastrService.error("CPF inválido. Verifique!")
        }else if( this.formularioEnergiaDespesa.value.cnpjcpffornecedor.length > 11 && (!this.appService.validarCNPJ(this.formularioEnergiaDespesa.value.cnpjcpffornecedor)) ){
          this.toastrService.error("CNPJ inválido. Verifique!")
        }else{//atualiza
          this.energiaService.update(this.getDataFormulario())
          this.toastrService.success("Atualizado com sucesso!")
          this.eventEmitAtualizarTela.emit();
          this.dismiss();
          this.makeHttpRequets();
        }
        
      }else{//validação edição

        if(existeNotaFiscalCadastrada){
          this.toastrService.error("O número da nota fiscal já foi cadastrado. Verifique!")
        }else if( this.formularioEnergiaDespesa.value.cnpjcpffornecedor.length < 12 && (!this.appService.validarCPF(this.formularioEnergiaDespesa.value.cnpjcpffornecedor)) ){
          this.toastrService.error("CPF inválido. Verifique!")
        }else if( this.formularioEnergiaDespesa.value.cnpjcpffornecedor.length > 11 && (!this.appService.validarCNPJ(this.formularioEnergiaDespesa.value.cnpjcpffornecedor)) ){
          this.toastrService.error("CNPJ inválido. Verifique!")
        }else{//salva
          this.energiaService.save( this.getDataFormulario() )
          this.toastrService.success("Salvo com sucesso!")
          this.eventEmitAtualizarTela.emit();
          this.dismiss();
          this.makeHttpRequets();
        }       
      }    
    }else{
      this.toastrService.error("O valor total deve ser igual a soma de valores do centro de custo. Verifique!")
    }    
  }
}

  open(id: number) { 
    this.restoreDefaultValue(); 
    if(id){
      this.subjectPesquisaDespesa.next(id)
    }
                
    this.modalRef = this.modalService.open(this.modalContent, { windowClass: 'modal-lg animate' })    
  }

  restoreDefaultValue(){
    this.formularioEnergiaDespesa.reset();
      this.despesa = new DespesasEnergia();
      this.valoresCC = [];
      this.centrosCustoSelecionados = [];  
      this.dataMesCompetencia = null;
      this.itensDespesasSelect = [];
  }
  
  close() {
    this.restoreDefaultValue()
    this.modalRef.close()
  }
  
  dismiss() {
    this.restoreDefaultValue()
    this.modalRef.dismiss()
  }

  insertDepartamento(){
    if(!!this.formularioEnergiaDespesa.value.codigodepartamento){
      let departamentoxdespesa = this.itensDepartamentosSelect.filter((item) => item.codigo === this.formularioEnergiaDespesa.value.codigodepartamento)
      let departamento : string = departamentoxdespesa[0].listadepartamentos
      
      //atualiza o departamento selecionado
      this.formularioEnergiaDespesa.patchValue({
        departamento : departamento,
        tipodespesa : null
      })
      //atualiza a lista de despesas para o ng select
      this.itensDespesasSelect = departamentoxdespesa[0].listadespesas
      this.despesaSelect = null;      
    }
  }

  //retorna o nome do centro de custo
  getCentroCusto(codigo: number): string{
    return this.listCentroCusto.filter((centroCusto)=> centroCusto.centrocusto === codigo)[0].descricao;
  }

  //controla o centro de custo que foi removido do ngselect para excluir da lista de valores do centro de custo
  handleSelectionChange() {
    if(this.listaanterior.length < this.centrosCustoSelecionados.length){
      this.listaanterior = this.centrosCustoSelecionados
    }else if(this.centrosCustoSelecionados.length < this.listaanterior.length){
      let removedItems =[];
      let removedIndices = []
      removedItems = this.listaanterior.filter(item => !this.centrosCustoSelecionados.includes(item));
      removedIndices = removedItems.map(removedItem => {
        return this.listaanterior.findIndex(item => item === removedItem);
      }).filter(index => index !== -1);
      this.valoresCC.splice(removedIndices[0],1);
      this.listaanterior = this.centrosCustoSelecionados
    }
     if(this.centrosCustoSelecionados.length < 1 || this.centrosCustoSelecionados[0] == undefined){
      this.listaanterior = [];
      this.valoresCC = [];
    }
  }

  //controla o mes e ano de competencia
  dateNavigate($event: NgbDatepickerNavigateEvent) {  
    this.formularioEnergiaDespesa.patchValue({
      mescompetencia   :  `${$event.next.month}`,
      anocompetencia   :   `${$event.next.year}`
    });      
  }

  //controla a data de emissao e vencimento
  changeValueDateComponent(evt : Event, componentName : string){    
    if (componentName === 'dataemissaonf_component'){        
      this.formularioEnergiaDespesa.patchValue({
        dataemissaonf: evt
      });
    } else if (componentName === 'datavencimentonf_component'){        
      this.formularioEnergiaDespesa.patchValue({
        datavencimentonf: evt
      });
    }
  }
}
