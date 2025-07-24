import { Component, Input } from '@angular/core';

import { Datatable } from './datatable.component';
import { DatatableC } from './datatableC.component';

@Component({
  selector: 'datatable-search',
  templateUrl: './datatable-search.template.html'
})
export class DatatableSearch {

  @Input() datatable: Datatable;
  @Input() datatableC: DatatableC;

  search: string;

  constructor() {
    this.search = null;
    this.datatable = null;
    this.datatableC = null;
  }

  updateSearch() {
    if (this.datatable != null) {
      this.datatable.setSearch(this.search);
    } else {
      this.datatableC.setSearch(this.search);
    }
  }

}