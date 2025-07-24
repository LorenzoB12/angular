export class Page {

    size: number;
    totalElements: number;
    totalPages: number;
    pageNumber: number;

    constructor(size) {
        this.size = size;
        this.totalElements = 0;
        this.totalPages = 0;
        this.pageNumber = 0;
    }

}