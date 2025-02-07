import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

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
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  errorMessage: string | null = null;
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  // Define as colunas que serão exibidas na tabela
  displayedColumns: string[] = ['name', 'exames_date', 'created_at', 'visualizar', 'excluir'];
  dataSource: Report[] = [];

  ngOnInit(): void {
    this.loadReports();
  }

  novoRelatorio(): void {
    // Função para criar um novo relatório
    console.log('Novo Relatório clicado');
    // Implemente a lógica de criação aqui
  }

  async loadReports() {
    this.apiService.getAllReports()
      .then(response => {
        // Supondo que o endpoint retorne os relatórios em response.data
        this.dataSource = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar relatórios:', error);
      });
  }

  getReport(id: number): void {
    this.apiService.getReport(id)
      .then(response => {
        // Navega para a página do relatório enviando os dados via state
        this.router.navigate(['/report'], { state: { report: response.data } });
      })
      .catch(error => {
        console.error('Erro ao carregar relatório:', error);
      });
  }

  async deleteReport(id: number): Promise<void> {
    // Abre o diálogo para solicitar a senha
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      backdropClass: 'blur-backdrop'
    });
  
    // Ao fechar o diálogo, processa a senha informada
    dialogRef.afterClosed().subscribe(async (password: string) => {
      if (password) {
        try {
          // Realiza um novo login para reautenticação
          // Observe que aqui assumimos que o método login retorna uma resposta onde a propriedade 'data.isAuthenticated' indica se a autenticação foi bem-sucedida.
          const loginResponse = await this.apiService.login(this.apiService.getUserName(), password, false);
          
          // Verifica se a reautenticação foi bem-sucedida
          if (loginResponse.data != null) {
            // Chama o endpoint para exclusão do relatório e atualiza a lista
            const deleteResponse = await this.apiService.deleteReport(id);
            
            this.ngOnInit();
          } else {
            // Se a senha estiver incorreta, você pode exibir uma mensagem de erro para o usuário
            console.error('Senha incorreta. Exclusão não autorizada.');
            // Aqui, você pode usar um snackBar ou outro componente para exibir a mensagem visualmente
          }
        } catch (error) {
          console.error('Erro ao excluir relatório:', error);
          // Trate o erro conforme necessário (ex: exibir mensagem para o usuário)
        }
      }
    });
  }
}
