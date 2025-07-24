export class DespesasEnergia{
    id: number;
    departamento: string;
    codigodepartamento: string;
    tipodespesa: string;
    tipoocorrencia: string;
    cnpjcpffornecedor: string;
    nomefornecedor: string;
    valortotal: number;
    valorcc: any[];
    cc: any[];
    mescompetencia: number;
    anocompetencia: number;
    dataemissaonf: Date;
    datavencimentonf: Date;
    numeronotafiscal: string;
    numerocontrato: string;
    descricaodespesa: string;
    transacao: string;
    nfeletronicasimnao: string;
    serienf: string;
    odi: string;
    pedidocompra: string;
}