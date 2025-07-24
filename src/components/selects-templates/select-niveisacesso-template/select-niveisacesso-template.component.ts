// ng-select-option.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'select-niveisacesso-option-template',
  template: `
    <div><span><strong>Nível de Acesso: {{ item.descricao }}</strong></span></div>
    <small>ID: {{ item.id }}</small>
  `,
})
export class SelectNiveisAcessoOptionComponent {
  @Input() item: any; // Assuming 'item' is the object structure you pass
}