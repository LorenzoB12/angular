import { PipeTransform, Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'braziltime' //Necessario para 'decorar' o pipe
})
export class BrazilTimePipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, "HH:mm");
    }
}