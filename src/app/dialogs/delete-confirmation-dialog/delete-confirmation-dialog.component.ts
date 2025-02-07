import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: false,
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent {
  passwordForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    if (this.passwordForm.valid) {
      // Fecha o diálogo retornando a senha digitada
      this.dialogRef.close(this.passwordForm.value.password);
    }
  }
}
