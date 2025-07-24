import { FormGroup } from "@angular/forms"

export class ProjectFunctions{

    public getClassValidField(formulario: FormGroup, nameField : string) : string{
        if (formulario.get(nameField).invalid && formulario.get(nameField).touched){
          return 'is-invalid'
        } else if (formulario.get(nameField).valid && formulario.get(nameField).touched){
          return 'is-valid'
        }
        return '' 
      }
      
    public compareValues(key, order = 'asc') {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
          }
      
          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
    }
  
    /**
     * Responsável por converter o ByteArray vindo do server em um arquivo para "Download"
     * @param b64Data 
     * @param contentType 
     * @param sliceSize 
     */
    public convertBase64ToBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }
        
      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

    public dynamicSimpleSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          /* next line works with strings and numbers, 
          * and you may want to customize it to your needs
          */
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
    }

    /**
     * Realiza o cálculo de datas
     * @param period Em Dias
     */
    public getDatesBySelectedPeriod(period : number) : any {
      var inicio : Date = null;
      var fim : Date = null;
      
      if (period == null){
        fim    = new Date('2050-01-01T00:00:00');
        inicio = new Date('2000-01-01T00:00:00');
      } else {                        
        if ((period >= 0)) {        
          fim = this.addDays(new Date(), (period));        
          inicio = new Date();                  
        } else {
          fim = new Date();                  
          inicio = new Date('2000-01-01T00:00:00');
        }
      }
      
      let periods = {             
        datainicio : inicio,
        datafim    : fim      
      }
      
      return periods;
    }
    
    public completedPercent(tasks, completed) {
      if (tasks == 0){
        return 0;
      } else {
        return Math.round((completed / tasks) * 100);
      }    
    }

    public fileIcon(file) {

      let icon = 'far fa-file';
  
      if (/\.zip$|\.tar$|\.tar\.gz$|\.rar$/i.test(file)) { icon = 'far fa-file-archive'; }
      if (/\.mp3$|\.wma$|\.ogg$|\.flac$|\.aac$/i.test(file)) { icon = 'far fa-file-audio'; }
      if (/\.avi$|\.flv$|\.wmv$|\.mov$|\.mp4$/i.test(file)) { icon = 'far fa-file-video'; }
      if (/\.js$|\.es6$|\.ts$/i.test(file)) { icon = 'fab fa-js'; }
      if (/\.doc$|\.docx$/i.test(file)) { icon = 'far fa-file-word'; }
      if (/\.xls$|\.xlsx$/i.test(file)) { icon = 'far fa-file-excel'; }
      if (/\.htm$|\.html$/i.test(file)) { icon = 'fab fa-html5'; }
      if (/\.pdf$/i.test(file)) { icon = 'far fa-file-pdf'; }
      if (/\.txt$/i.test(file)) { icon = 'far fa-file-alt'; }
      if (/\.css$/i.test(file)) { icon = 'fab fa-css3'; }    
      if (/\.jpg$|\.jpeg$|\.png$/i.test(file)) { icon = 'far fa-file-image'; }
      if (/\.ppt$|\.pptx$/i.test(file)) { icon = 'far fa-file-powerpoint'; }
  
      return icon;
    }

    public addDays(basedate: Date, days : number): Date{      
      basedate.setDate(basedate.getDate() + days);
      return basedate;
    }

    public calculatePercent(total, value) {
      if (total == 0){
        return 0;
      } else {
        return Math.round((value / total) * 100);
      }    
    }

    public isGraterThanToday(timestamp : Number){      
      //Verifica se a data é maior que hoje
      if (new Date().getTime() > timestamp){
        return false
      } else {
        return true
      }
    }

    public isInicioGraterThanFim(inicio : Number, fim : Number){            
      if (inicio > fim){
        return true
      } else {
        return false
      }
    }

    arrayToString(array : Array<any>):string{
      if(!!array){
        return array.join(',');
      }
      return null;
     
    }
  
    stringToArray(string): Array<any>{   
      if(!!string){
          // Use o método split() para dividir a string em um array
      const array = string.split(',');
  
      // Use o método map() para converter as substrings em números
      const numberArray = array.map((element) => parseFloat(element));   
      return numberArray;
      }
      return null;
    }
}
