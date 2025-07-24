import { PipeTransform, Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'brazildatetime' //Necessario para 'decorar' o pipe
})
export class BrazilDateTimePipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, "dd/MM/yyyy HH:mm:ss");
    }
}