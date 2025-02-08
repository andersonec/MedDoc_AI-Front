import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-annex-documents-dialog',
  standalone: false,
  templateUrl: './annex-documents-dialog.component.html',
  styleUrls: ['./annex-documents-dialog.component.css']
})
export class AnnexDocumentsDialogComponent {
  medicalCardImage: File | null = null;
  mriReportFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<AnnexDocumentsDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChange(event: Event, fileType: 'medicalCardImage' | 'mriReportFile'): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      if (fileType === 'medicalCardImage') {
        this.medicalCardImage = input.files[0];
      } else {
        this.mriReportFile = input.files[0];
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.medicalCardImage && this.mriReportFile) {
      try {
        const formData = new FormData();
        formData.append('medical_card_image', this.medicalCardImage);
        formData.append('mri_report_file', this.mriReportFile);

        await this.apiService.newReport(formData); // Enviar arquivos para a API
        this.dialogRef.close(true); // Fechar a modal com sucesso
      } catch (error) {
        console.error('Erro ao enviar arquivos:', error);
      }
    } else {
      console.error('Ambos os arquivos são necessários!');
    }
  }
}
