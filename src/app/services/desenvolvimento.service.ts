import { Http } from "@angular/http";
import { Service } from "./service";
import { Injectable } from "@angular/core";
import { DespesasDesenvolvimento } from "../model/despesasdesenvolvimento.model";
import { Observable } from "rxjs";
import { LocalStorageKeysENUM } from "../shared/app.localstoragekeys";

@Injectable()
export class DesenvolvimentoService extends Service {

    constructor(private http: Http) {
        super();
    }

    public update(despesa: DespesasDesenvolvimento) {
        if (despesa.id === null || despesa.id === undefined) {

        } else {
            let despesasExistentes: DespesasDesenvolvimento[] = [];
            despesasExistentes = this.getList();
            let despesasAtualizadas = despesasExistentes.filter((despesaFilter) => despesaFilter.id !== despesa.id)
            despesasAtualizadas.push(despesa);
            localStorage.setItem(LocalStorageKeysENUM.DESPESA_DESENVOLVIMETO, JSON.stringify(despesasAtualizadas));
        }
    }

    public save(despesa: DespesasDesenvolvimento) {
        let despesasExistentes: DespesasDesenvolvimento[] = [];
        if (this.getList() !== undefined && this.getList().length !== 0) {
            despesasExistentes = this.getList();
        }

        despesasExistentes.push(despesa);
        localStorage.setItem(LocalStorageKeysENUM.DESPESA_DESENVOLVIMETO, JSON.stringify(despesasExistentes));
    }

    public getList(): DespesasDesenvolvimento[] {
        return JSON.parse(localStorage.getItem(LocalStorageKeysENUM.DESPESA_DESENVOLVIMETO)) || [];
    }

    public getListObservable(): Observable<DespesasDesenvolvimento[]> {
        const observable: Observable<DespesasDesenvolvimento[]> = new Observable(observer => {
            observer.next(this.getList());
            observer.complete();
        });
        return observable;
    }

    public getOne(id: number): Observable<DespesasDesenvolvimento> {
        const despesas = this.getList();
        const observable: Observable<DespesasDesenvolvimento> = new Observable(observer => {
            observer.next(despesas.find(despesa => despesa.id === id))
            observer.complete();
        });
        return observable;
    }

    public delete(id: number) {
        let despesas = this.getList();
        let despesasAtualizadas = despesas.filter((despesa) => despesa.id !== id)
        localStorage.setItem(LocalStorageKeysENUM.DESPESA_DESENVOLVIMETO, JSON.stringify(despesasAtualizadas));
    }
}    