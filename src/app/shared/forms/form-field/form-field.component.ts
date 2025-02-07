import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent {
  @Input() label: string = ''; // Label do campo
  @Input() placeholder: string = ''; // Placeholder do campo
  @Input() type: string = 'text'; // Tipo do campo: text, email, number etc.
  @Input() required: boolean = false; // Se o campo é obrigatório
  @Input() disabled: boolean = false; // Se o campo está desabilitado

  control: FormControl = new FormControl('');

  ngOnInit() {
    const validators = this.required ? [Validators.required] : [];
    this.control = new FormControl({ value: '', disabled: this.disabled }, validators);
  }
}
