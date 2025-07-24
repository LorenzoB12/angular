export type EnumArray = Array<{value: number, text: string}>;

export const constantTipoEmpresa: EnumArray = [
    {value: 0, text: 'Matriz'},
    {value: 1, text: 'Filial'}
];

export const constantTipoDocumento: EnumArray = [
    {value: 1, text: 'CPF'},
    {value: 2, text: 'CNPJ'}
];

export const constantSimNaoENUM: EnumArray = [    
    {value: 0, text: 'Não'},    
    {value: 1, text: 'Sim'}
];

export const constantAptoExameENUM: EnumArray = [    
    {value: 0, text: 'Não'},    
    {value: 1, text: 'Sim'},
    {value: 99, text: 'Revisar'},
];

export const constantTipoOcorrenciaENUM: EnumArray = [    
    {value: 0, text: 'Mensal'},    
    {value: 1, text: 'Semanal'},
    {value: 2, text: 'Eventual'},
];

export const resultadoExameEnum: EnumArray = [    
    {value: 0, text: 'Em Análise'},    
    {value: 1, text: 'Negativo'},
    {value: 2, text: 'Inconclusivo'},
    {value: 3, text: 'Positivo'}
];

export enum diagnosticoGestacaoENUM{
    INSEMINADA = 1,
    VAZIA = 2,
    INVOLUCAO = 3,
    PRENHA = 10
}

export enum TipoPropriedadeDocumentoEnum{
    GERAL = 1,
    EXAME = 2
}


export enum HttpCodesENUM{
    OK = 200,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500
}

export enum NiveisAcessoActionsENUM{
    ACESSAR = 1,
    INSERIR = 2,
    ALTERAR = 3,
    EXCLUIR = 4
}

export enum RelatoriosTypesEnum{
    PDF = "PDF",
    EXCEL = "EXCEL"
}

export enum AuthorityTypes {
    ROLE_USER  = 'ROLE_USER',
    ROLE_PRODUTOR = 'ROLE_PRODUTOR'
}

export enum relatoriosGrupoEnum{
    TODOS = "Todos",
    CADASTRAL = "Cadastral",
    REPRODUTIVO = "Reprodutivo",
    SANITARIO = "Sanitário"
}

export enum TipoDadoEnum{
    INFORMACAO = 1,
    ENUM = 2,
    COLETAVALOR = 3
}

export enum TipoValorEnum{
    DOUBLE = 1,
	LONG = 2,
	BOOLEAN = 3,
	STRING = 4,
	SIMNAOENUM = 100,
	NIVELLIMPEZAENUM = 101,
	CORRETOINCORRETOENUM = 102,
	GRAUENUM = 103,
	ETIOLOGIAENUM = 104,
	TIPOMASTITEENUM = 105,
	AGENTECONTAGIOSOENUM = 106,
	AGENTEAMBIENTALENUM = 107,
	ESTADOCONSERVACAOENUM = 108,
	SISTEMAPRODUCAOENUM = 109,
	TEMPERATURAENUM = 110,
	FASEDESENVOLVIMENTOPASTOENUM = 111,
	ESCORECOCHO = 112
}

export enum TipoReleaseNotesENUM{
    TODOS = "",
    PLATAFORMA_WEB = 1,
    APLICATIVO_ANDROID = 2,
    APLICATIVO_IOS = 3
}

export enum TipoAcoesPendentesEnum{
    CERTIFICACOES = 1,
	INSEMINACOES = 2,
	DIAGNOSTICOGESTACAO = 3,
	SECAGEM = 4,
	PARTOS  = 5,
	PROTOCOLOS = 6
}


export enum TipoFinanceiroEnum{
    DESPESA = 0,
    RECEITA = 1
}