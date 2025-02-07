import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mat-flat-button',
  standalone: false,
  
  templateUrl: './mat-flat-button.component.html',
  styleUrl: './mat-flat-button.component.css'
})
export class MatFlatButtonComponent {
  @Input() color: string = 'primary'; // Cor do botão
  @Input() disabled: boolean = false; // Estado de desabilitado
  @Input() label: string = ''; // Texto do botão
  @Output() onClick = new EventEmitter<void>(); // Evento de clique

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
