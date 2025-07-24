import { Injectable } from "@angular/core";
import { Service } from "./service";
import { Http } from "@angular/http";
import { DespesasEnergia } from "../model/despesasenergia.model";
import { LocalStorageKeysENUM } from "../shared/app.localstoragekeys";
import { Observable } from "rxjs";

@Injectable()
export class EnergiaService extends Service {

    constructor(private http: Http) {
        super();
    }

    public update(despesa: DespesasEnergia) {
        if (despesa.id === null || despesa.id === undefined) {

        } else {
            let despesasExistentes: DespesasEnergia[] = [];
            despesasExistentes = this.getList();
            let despesasAtualizadas = despesasExistentes.filter((despesaFilter) => despesaFilter.id !== despesa.id)
            despesasAtualizadas.push(despesa);
            localStorage.setItem(LocalStorageKeysENUM.DESPESA_ENERGIA, JSON.stringify(despesasAtualizadas));
        }
    }

    public save(despesa: DespesasEnergia) {
        let despesasExistentes: DespesasEnergia[] = [];
        if (this.getList() !== undefined && this.getList().length !== 0) {
            despesasExistentes = this.getList();
        }

        despesasExistentes.push(despesa);
        localStorage.setItem(LocalStorageKeysENUM.DESPESA_ENERGIA, JSON.stringify(despesasExistentes));
    }

    public getList(): DespesasEnergia[] {
        return JSON.parse(localStorage.getItem(LocalStorageKeysENUM.DESPESA_ENERGIA)) || [];
    }

    public getListObservable(): Observable<DespesasEnergia[]> {
        const observable: Observable<DespesasEnergia[]> = new Observable(observer => {
            observer.next(this.getList());
            observer.complete();
        });
        return observable;
    }

    public getOne(id: number): Observable<DespesasEnergia> {
        const despesas = this.getList();
        const observable: Observable<DespesasEnergia> = new Observable(observer => {
            observer.next(despesas.find(despesa => despesa.id === id))
            observer.complete();
        });
        return observable;
    }

    public delete(id: number) {
        let despesas = this.getList();
        let despesasAtualizadas = despesas.filter((despesa) => despesa.id !== id)
        localStorage.setItem(LocalStorageKeysENUM.DESPESA_ENERGIA, JSON.stringify(despesasAtualizadas));
    }
}    