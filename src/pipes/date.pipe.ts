import { PipeTransform, Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'brazildate' //Necessario para 'decorar' o pipe
})
export class BrazilDatePipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any { 
        return  super.transform(value, 'dd/MM/yyyy');        
    }
}