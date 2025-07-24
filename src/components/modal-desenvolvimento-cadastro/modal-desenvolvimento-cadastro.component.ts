import { Component, Injectable, TemplateRef, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbDatepickerNavigateEvent, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../app/app.service';
import { ProjectMask } from '../../app/shared/app.masks';
import { DespesasDesenvolvimento } from '../../app/model/despesasdesenvolvimento.model';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, switchMap } from 'rxjs/operators';
import { ToastrService } from '../../app/services/toastr.service';
import { DesenvolvimentoService } from '../../app/services/desenvolvimento.service';
import { ProjectFunctions } from '../../app/shared/app.functions';
import { DepartamentosXDespesasService } from '../../app/services/departamentoxdespesas.service';
import { OperacoesService } from '../../app/services/operacoes.service';
import { CentroCustoService } from '../../app/services/centrocusto.service';
import { Operacoes } from '../../app/model/operacoes.model';
import { constantSimNaoENUM, constantTipoOcorrenciaENUM } from '../../app/shared/app.constants';
import { CentroCustoDesenvolvimento } from '../../app/model/centrocusto-desenvolvimento.model';
import { DatabaseDatePipe } from '../../pipes/databasedate.pipe';

@Component({
    selector: 'modal-desenvolvimento-cadastro',
    templateUrl: './modal-desenvolvimento-cadastro.template.html',
    providers:[DesenvolvimentoService, DepartamentosXDespesasService, OperacoesService, CentroCustoService, DatabaseDatePipe,]
  })
@Injectable()
export class ModalDesenvolvimentoCadastroComponent implements OnInit{ 
 @ViewChild('modalDesenvolvimentoCadastro') private modalContent: TemplateRef<ModalDesenvolvimentoCadastroComponent>;
 @Output('atualizarTela') eventEmitAtualizarTela = new EventEmitter();
  private modalRef: NgbModalRef;

  public projectMask = new ProjectMask();
  public despesa: DespesasDesenvolvimento = new DespesasDesenvolvimento();
  public projectFunctions = new ProjectFunctions();
  public listSimNao = constantSimNaoENUM;
  public listTipoOcorrencia = constantTipoOcorrenciaENUM;
  
  private subjectPesquisaDespesa : Subject<number> = new Subject<number>(); //Proxy para utilizarmos na pesquisa
  private despesasObservable : Observable<DespesasDesenvolvimento>;

  private subjectPesquisaDepartamentosxDespesas : Subject<string> = new Subject<string>(); //Proxy para utilizarmos na pesquisa
  private departamentosxDespesasObservable : Observable<[]>;
  public itensDepartamentosSelect = [];
  public itensDespesasSelect = [];
  public despesaSelect = null
  public dataMesCompetencia = null//controla o mes e ano de competencia 

  private subjectPesquisaOperacoes : Subject<string> = new Subject<string>(); //Proxy para utilizarmos na pesquisa
  private operacoesObservable : Observable<[]>;
  public listOperacoes : any[] = [];

  private subjectPesquisa: Subject<string> = new Subject<string>(); //Proxy para utilizarmos na pesquisa
  private desenvolvimentoObservable: Observable<any>;
  public lista = [];

  private subjectPesquisaCentroCusto : Subject<string> = new Subject<string>(); //Proxy para utilizarmos na pesquisa
  private centroCustoObservable : Observable<[]>;
  public listCentroCusto : CentroCustoDesenvolvimento[] = new Array<CentroCustoDesenvolvimento>();
  public centrosCustoSelecionados = []
  public valoresCC = []
  public listaanterior = [];
     
  //Reactive Forms - Sera conectado ao formulario - Conectado ao template.
  public formularioDesenvolvimentoDespesa : FormGroup = new FormGroup({
    'id': new FormControl(null),
    'codigodepartamento'  : new FormControl(null,[Validators.required]),
    'departamento': new FormControl(null,[Validators.required]),
    'tipodespesa': new FormControl(null,[Validators.required]),
    'tipoocorrencia': new FormControl(null,[Validators.required]),
    'cnpjcpffornecedor': new FormControl(null,[Validators.required]),
    'nomefornecedor': new FormControl(null,[Validators.required]),
    'valortotal': new FormControl(null,[Validators.required]),
    'valorcc': new FormControl(null),
    'cc': new FormControl(null,[Validators.required]),
    'unidade': new FormControl(null),
    'mescompetencia': new FormControl(null,[Validators.required]),
    'anocompetencia': new FormControl(null,[Validators.required]),
    'dataemissaonf': new FormControl(null),
    'datavencimentonf': new FormControl(null),
    'numeronotafiscal': new FormControl(null),
    'numerocontrato': new FormControl(null),
    'descricaodespesa': new FormControl(null),
    'operacao': new FormControl(null),
    'nfeletronicasimnao': new FormControl(null,[Validators.required]),
    'serienf': new FormControl(null),
  })

  constructor(private appService: AppService,
              private modalService: NgbModal,
              private toastrService: ToastrService,
              private desenvolvimentoService: DesenvolvimentoService,
              private departamentoxdespesasService: DepartamentosXDespesasService,
              private operacoesService: OperacoesService,
              private centroCustoService: CentroCustoService,
              private databaseDatePipe : DatabaseDatePipe, 
              ){
  this.appService.pageTitle = 'Cadastro de Despesas';
  }
  ngOnInit(): void {
    //Prepara as chamadas HTTP
    this.prepareHttpRequests();
    this.makeHttpRequests();
  }

  makeHttpRequests(){
    this.subjectPesquisaDepartamentosxDespesas.next("");
    this.subjectPesquisaOperacoes.next("");
    this.subjectPesquisaCentroCusto.next("");
    this.subjectPesquisa.next("");
  }

  private prepareHttpRequests() : void{
    //lista de despesas cadastradas
    this.desenvolvimentoObservable = this.subjectPesquisa
      .pipe(
        switchMap(() => {
          return this.desenvolvimentoService.getListObservable() // Retorna o ApiResponse.
        })
      )

    this.desenvolvimentoObservable.subscribe(
      (resposta: DespesasDesenvolvimento[]) => {
        this.lista = resposta;
      }
    );

     //Despesa
    this.despesasObservable = this.subjectPesquisaDespesa
    .pipe(
            switchMap((id: number) => {
           return this.desenvolvimentoService.getOne(id) // Retorna o ApiResponse.
          }),
          catchError((erro: any) => {
            return new Observable<DespesasDesenvolvimento>(); //Retorna vazio.
          })
        )

    this.despesasObservable.subscribe(
      (resposta : DespesasDesenvolvimento) => {
        this.despesa = resposta;
        this.setDataFormulario();
      }
    );
    
     //Departamentos
     this.departamentosxDespesasObservable = this.subjectPesquisaDepartamentosxDespesas
     .pipe(
             switchMap(() => {
            return this.departamentoxdespesasService.getListDesenvolvimento();
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

     //Operacoes
     this.operacoesObservable = this.subjectPesquisaOperacoes
     .pipe(
             switchMap(() => {
            return this.operacoesService.getList();
           }),
           catchError((erro: any) => {
             return new Observable<any>(); //Retorna vazio.
           })
         )
 
     this.operacoesObservable.subscribe(
       (resposta : any) => {
         this.listOperacoes = resposta.operacoes;
        }
     );

     //Centro de Custo
     this.centroCustoObservable = this.subjectPesquisaCentroCusto
     .pipe(
             switchMap(() => {
            return this.centroCustoService.getListDesenvolvimento();
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
    
    this.formularioDesenvolvimentoDespesa.patchValue({
      id : this.despesa.id,
      codigodepartamento   : !!this.despesa.codigodepartamento ? this.despesa.codigodepartamento : null,
      departamento  : !!this.despesa.departamento ? this.despesa.departamento : null,
      tipodespesa   : this.despesa.tipodespesa,
      tipoocorrencia   : this.despesa.tipoocorrencia,
      cnpjcpffornecedor   : this.despesa.cnpjcpffornecedor,
      nomefornecedor   : this.despesa.nomefornecedor,
      valortotal   : this.despesa.valortotal  !== null ? this.projectMask.maskValue(this.despesa.valortotal) : "",
      cc   : this.despesa.cc,
      unidade   : this.despesa.unidade,
      mescompetencia   : this.despesa.mescompetencia,
      anocompetencia   : this.despesa.anocompetencia,
      dataemissaonf   :  this.despesa.dataemissaonf,
      datavencimentonf   : this.despesa.datavencimentonf,
      numeronotafiscal   : this.despesa.numeronotafiscal,
      numerocontrato   : this.despesa.numerocontrato,
      descricaodespesa   : this.despesa.descricaodespesa,
      operacao   : this.despesa.operacao.codigo,
      nfeletronicasimnao   : this.despesa.nfeletronicasimnao,
      serienf   : this.despesa.serienf    
  });
}

private getDataFormulario() : DespesasDesenvolvimento{
  let objectDespesa = new DespesasDesenvolvimento();
  
  objectDespesa.id = !!this.formularioDesenvolvimentoDespesa.value.id ? this.formularioDesenvolvimentoDespesa.value.id : new Date().getTime();
  objectDespesa.codigodepartamento = this.formularioDesenvolvimentoDespesa.value.codigodepartamento;      
  objectDespesa.departamento = this.formularioDesenvolvimentoDespesa.value.departamento;      
  objectDespesa.tipodespesa = this.formularioDesenvolvimentoDespesa.value.tipodespesa;
  objectDespesa.tipoocorrencia = this.formularioDesenvolvimentoDespesa.value.tipoocorrencia;
  objectDespesa.cnpjcpffornecedor = this.formularioDesenvolvimentoDespesa.value.cnpjcpffornecedor;
  objectDespesa.nomefornecedor = this.formularioDesenvolvimentoDespesa.value.nomefornecedor;
  objectDespesa.valortotal = this.formularioDesenvolvimentoDespesa.value.valortotal !== null ? this.projectMask.unmaskNumber(this.formularioDesenvolvimentoDespesa.value.valortotal): null;
  objectDespesa.valorcc =  this.valoresCC;
  objectDespesa.cc = this.formularioDesenvolvimentoDespesa.value.cc;
  objectDespesa.unidade = this.formularioDesenvolvimentoDespesa.value.unidade;
  objectDespesa.mescompetencia = this.formularioDesenvolvimentoDespesa.value.mescompetencia;
  objectDespesa.anocompetencia = this.formularioDesenvolvimentoDespesa.value.anocompetencia;        
  objectDespesa.dataemissaonf = this.formularioDesenvolvimentoDespesa.value.dataemissaonf;
  objectDespesa.datavencimentonf = this.formularioDesenvolvimentoDespesa.value.datavencimentonf;  
  objectDespesa.numerocontrato = this.formularioDesenvolvimentoDespesa.value.numerocontrato;    
  objectDespesa.numeronotafiscal = this.formularioDesenvolvimentoDespesa.value.numeronotafiscal;
  objectDespesa.descricaodespesa = this.formularioDesenvolvimentoDespesa.value.descricaodespesa;
  
  objectDespesa.nfeletronicasimnao = this.formularioDesenvolvimentoDespesa.value.nfeletronicasimnao;
  objectDespesa.serienf = this.formularioDesenvolvimentoDespesa.value.serienf;   
  
  let operacao : Operacoes = new Operacoes();
  operacao.codigo = this.formularioDesenvolvimentoDespesa.value.operacao;
  if(this.formularioDesenvolvimentoDespesa.value.operacao){
    operacao.operacao = this.listOperacoes.filter((objectOperacao) => objectOperacao.codigo === this.formularioDesenvolvimentoDespesa.value.operacao)[0].operacao;
  }  
  objectDespesa.operacao = operacao;

  if(!!this.valoresCC && this.valoresCC.length > 0){
    this.valoresCC.forEach((valor, index)=> {
     objectDespesa.valorcc[index] = this.projectMask.unmaskNumber(valor)})
  }
  
  return objectDespesa;
}

public onSubmit(){
  this.formularioDesenvolvimentoDespesa.updateValueAndValidity();

  if (this.formularioDesenvolvimentoDespesa.status === 'INVALID'){      
    this.formularioDesenvolvimentoDespesa.get('codigodepartamento').markAsTouched();
    this.formularioDesenvolvimentoDespesa.get('departamento').markAsTouched();
    this.formularioDesenvolvimentoDespesa.get('tipodespesa').markAsTouched();
    this.formularioDesenvolvimentoDespesa.get('tipoocorrencia').markAsTouched();
    this.formularioDesenvolvimentoDespesa.get('cnpjcpffornecedor').markAsTouched();
    this.formularioDesenvolvimentoDespesa.get('nomefornecedor').markAsTouched();
    this.formularioDesenvolvimentoDespesa.get('valortotal').markAsTouched();
    this.formularioDesenvolvimentoDespesa.get('mescompetencia').markAsTouched();
    this.formularioDesenvolvimentoDespesa.get('anocompetencia').markAsTouched();
    this.formularioDesenvolvimentoDespesa.get('nfeletronicasimnao').markAsTouched();
    this.formularioDesenvolvimentoDespesa.get('cc').markAsTouched();
      
    this.toastrService.info("O Cadastro não foi preenchido corretamente. Verifique!")
  } else { //Form is Valid
    let valorTotalCC = 0;

    this.valoresCC.forEach((valorcc)=> valorTotalCC += this.projectMask.unmaskNumber(valorcc) )
    if(valorTotalCC == this.projectMask.unmaskNumber(this.formularioDesenvolvimentoDespesa.value.valortotal)){
      let existeNotaFiscalCadastrada: boolean = this.lista.some(despesaDesenvolvimento => despesaDesenvolvimento.numeronotafiscal === this.formularioDesenvolvimentoDespesa.value.numeronotafiscal && !!despesaDesenvolvimento.numeronotafiscal);

      if(!!this.formularioDesenvolvimentoDespesa.value.id){//validação de cadastro novo
        if(this.formularioDesenvolvimentoDespesa.value.cnpjcpffornecedor.length < 12 && (!this.appService.validarCPF(this.formularioDesenvolvimentoDespesa.value.cnpjcpffornecedor)) ){
          this.toastrService.error("CPF inválido. Verifique!")
        }else if( this.formularioDesenvolvimentoDespesa.value.cnpjcpffornecedor.length > 11 && (!this.appService.validarCNPJ(this.formularioDesenvolvimentoDespesa.value.cnpjcpffornecedor)) ){
          this.toastrService.error("CNPJ inválido. Verifique!")
        }else{
          this.desenvolvimentoService.update(this.getDataFormulario())
          this.toastrService.success("Atualizado com sucesso!")
          this.eventEmitAtualizarTela.emit();
          this.dismiss();
          this.makeHttpRequests();
        }
        
      }else{//validação de edição
        if(existeNotaFiscalCadastrada){
          this.toastrService.error("O número da nota fiscal já foi cadastrado. Verifique!")
        }else if(this.formularioDesenvolvimentoDespesa.value.cnpjcpffornecedor.length < 12 && (!this.appService.validarCPF(this.formularioDesenvolvimentoDespesa.value.cnpjcpffornecedor)) ){
          this.toastrService.error("CPF inválido. Verifique!")
        }else if( this.formularioDesenvolvimentoDespesa.value.cnpjcpffornecedor.length > 11 && (!this.appService.validarCNPJ(this.formularioDesenvolvimentoDespesa.value.cnpjcpffornecedor)) ){
          this.toastrService.error("CNPJ inválido. Verifique!")
        }else{
        this.desenvolvimentoService.save( this.getDataFormulario() )
        this.toastrService.success("Salvo com sucesso!")
        this.eventEmitAtualizarTela.emit();
        this.dismiss();
        this.makeHttpRequests();
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
    this.formularioDesenvolvimentoDespesa.reset();
      this.despesa = new DespesasDesenvolvimento();
      this.valoresCC = [];
      this.centrosCustoSelecionados = [];  
      this.dataMesCompetencia = null;
      this.itensDespesasSelect = []
  }
  
  close() {
    this.restoreDefaultValue(); 
    this.modalRef.close()
  }
  
  dismiss() {
    this.restoreDefaultValue(); 
    this.modalRef.dismiss()
  }

  insertDepartamento(){
    if(!!this.formularioDesenvolvimentoDespesa.value.codigodepartamento){
      let departamentoxdespesa = this.itensDepartamentosSelect.filter((item) => item.codigo === this.formularioDesenvolvimentoDespesa.value.codigodepartamento)
      let departamento : string = departamentoxdespesa[0].listadepartamentos
      
      //atualiza o departamento selecionado
      this.formularioDesenvolvimentoDespesa.patchValue({
        departamento : departamento,
        tipodespesa : null
      })
      //atualiza a lista de despesas para o ng select
      this.itensDespesasSelect = departamentoxdespesa[0].listadespesas;
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
    this.formularioDesenvolvimentoDespesa.patchValue({
      mescompetencia   :  `${$event.next.month}`,
      anocompetencia   :   `${$event.next.year}`
    });      
  }

  //controla a data de emissao e vencimento
  changeValueDateComponent(evt : Event, componentName : string){    
    if (componentName === 'dataemissaonf_component'){        
      this.formularioDesenvolvimentoDespesa.patchValue({
        dataemissaonf: evt
      });
    } else if (componentName === 'datavencimentonf_component'){        
      this.formularioDesenvolvimentoDespesa.patchValue({
        datavencimentonf: evt
      });
    }
  }
}
