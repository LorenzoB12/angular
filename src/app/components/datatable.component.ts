export class CertelDataTable{
    public dataTableData: Object[] = [];
    public originalDataTableData: Object[] = [];

    // Filters
    public filterVerified       = 'Any';
    public filterRole           = 'Any';
    public filterStatus         = 'Any';
    public filterLatestActivity = [null, null];
    // Table
    // Options
    public searchKeys = []; //'id', 'codigointerno', 'email', 'razaosocial'
    public sortBy     = ''; 
    public sortDesc   = true;
    public perPage    = 20;
  
    public filterVal   = '';
    public currentPage = 1;
    public totalItems  = 0;

  public get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  public updateDataTable() {    
    const data = this.filterDataTable(this.originalDataTableData);
    
    this.totalItems = data.length;

    this.sortDataTable(data);
    this.dataTableData = this.paginateDataTable(data);    
  }

  public filterDataTable(data) {
    if (data !== undefined){      
      const filter = this.filterVal.toLowerCase();
      return !filter ?
        data.slice(0)  :
        data.filter(d => {
          return Object.keys(d)
            .filter(k => this.searchKeys.includes(k))
            .map(k => String(d[k]))
            .join('|')
            .toLowerCase()
            .indexOf(filter) !== -1 || !filter;
        });
    }
  }

  public sortDataTable(data) {
    data.sort((a: any, b: any) => {
      a = typeof(a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof(b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  public paginateDataTable(data) {    
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;
    
    return data.slice(offset, offset + perPage);
  }

  public setSortDataTable(key) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }

    this.currentPage = 1;
    this.updateDataTable();
  }
}