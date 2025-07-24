import { PipeTransform, Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'databasedate' //Necessario para 'decorar' o pipe
})
export class DatabaseDatePipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any { 
        return  super.transform(value, 'yyyy-MM-dd');        
    }
}