import { Operacoes } from "./operacoes.model";

export class DespesasDesenvolvimento{
    id: number;
    codigodepartamento: string;
    departamento: string;
    tipodespesa: string;
    tipoocorrencia: string;
    cnpjcpffornecedor: string;
    nomefornecedor: string;
    valortotal: number;
    valorcc: any[];
    cc: any[];
    unidade: string;
    mescompetencia: number;
    anocompetencia: number;
    dataemissaonf: Date;
    datavencimentonf: Date;
    numeronotafiscal: string;
    numerocontrato: string;
    descricaodespesa: string;
    operacao: Operacoes;
    nfeletronicasimnao: string;
    serienf: string;
}