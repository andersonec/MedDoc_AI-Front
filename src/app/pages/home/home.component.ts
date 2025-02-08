import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AnnexDocumentsDialogComponent } from '../../dialogs/annex-documents-dialog/annex-documents-dialog.component';

export interface Report {
  id: number;
  paciente: string;
  dataExame: Date;
  dataRelatorio: Date;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMessage: string | null = null;

  displayedColumns: string[] = ['name', 'exames_date', 'created_at', 'visualizar', 'excluir'];
  dataSource: Report[] = [];

  medicalCardImage: File | null = null;
  mriReportFile: File | null = null;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  openAnnexDocumentsDialog(): void {
    const dialogRef = this.dialog.open(AnnexDocumentsDialogComponent, {
      width: '400px',
      backdropClass: 'blur-backdrop'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Arquivos enviados com sucesso!');
        this.loadReports(); // Recarregar os relatórios após o envio
      } else {
        console.log('Envio cancelado');
      }
    });
  }

  // Função para carregar os relatórios ao inicializar
  async loadReports(): Promise<void> {
    try {
      const response = await this.apiService.getAllReports();
      this.dataSource = response.data;
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    }
  }

  // Função para visualizar um relatório específico
  getReport(id: number): void {
    this.apiService.getReport(id)
      .then(response => {
        this.router.navigate(['/report'], { state: { report: response.data } });
      })
      .catch(error => {
        console.error('Erro ao carregar relatório:', error);
      });
  }

  // Função para excluir um relatório
  async deleteReport(id: number): Promise<void> {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      backdropClass: 'blur-backdrop'
    });

    dialogRef.afterClosed().subscribe(async (password: string) => {
      if (password) {
        try {
          const loginResponse = await this.apiService.login(this.apiService.getUserName(), password, false);
          if (loginResponse.data) {
            await this.apiService.deleteReport(id);
            this.loadReports();
          } else {
            console.error('Senha incorreta. Exclusão não autorizada.');
          }
        } catch (error) {
          console.error('Erro ao excluir relatório:', error);
        }
      }
    });
  }
}
