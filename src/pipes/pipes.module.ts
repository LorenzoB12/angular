import { NgModule } from '@angular/core';

import { BrazilDateTimePipe } from './datetime.pipe';
import { BrazilDatePipe } from './date.pipe';
import { BrazilTimePipe } from './time.pipe';
import { TruncateStringPipe } from './truncatestring.pipe';
import { DatabaseDatePipe } from './databasedate.pipe';


@NgModule({
  declarations: [
    BrazilDatePipe,
    BrazilDateTimePipe,
    BrazilTimePipe,
    TruncateStringPipe,
    DatabaseDatePipe
  ],
  exports: [
    BrazilDateTimePipe,
    BrazilDatePipe,
    BrazilTimePipe,
    TruncateStringPipe,
    DatabaseDatePipe
  ]
})
export class PipesModule { }
