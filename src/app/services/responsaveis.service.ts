import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http'; //Responsável por converter o Observable para Promise;
import { Observable } from "rxjs";
import { map, retry } from "rxjs/operators";
import { Service } from "./service";

@Injectable()
export class ResponsaveisService extends Service{

    constructor(private http: Http) {
        super();
    }

    public getList(): Observable<any>{
        return this.http.get(
            ('assets/desenvolvimentodb/responsaveis.json') )
        .pipe(retry(10), //Permite que possamos colocar o número de tentativas
              map((resposta:Response) => resposta.json())) // Conseguimos assim transformar o retorno para um objeto - Somente o conteudo da resposta
              //Utilizamos o MAP para transformar no objeto esperado.
    }
}    