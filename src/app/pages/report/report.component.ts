import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportState } from './report-state.model'; 
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-report',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  report: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as ReportState;
    this.report = state?.report;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  generatePDF() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
  
    const marginLeft = 20;
    let cursorY = 30; // Posição inicial do texto
  
    // Configuração da fonte (Times New Roman não está no jsPDF por padrão)
    doc.setFont('times', 'normal');
  
    // Título Principal
    doc.setFontSize(16);
    doc.setFont('times', 'bold');
    doc.text('RELATÓRIO MÉDICO', 105, 20, { align: 'center' });
  
    // Função para adicionar texto com linha divisória
    const addText = (title: string, content: string, spaceAfter = 2) => {
      doc.setFont('times', 'bold');
      doc.setFontSize(12);
      doc.text(title, marginLeft, cursorY);
      cursorY += 5;
      doc.setFont('times', 'normal');
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(content, 170);
      doc.text(splitText, marginLeft, cursorY);
      cursorY += splitText.length * 5 + spaceAfter;
    };
  
    // Informações do Paciente
    addText('Paciente:', this.report.name);
    addText('Idade:', `${this.report.age} anos`);
    addText('Convênio:', this.report.medical_insurance);
    addText('Exames Realizados:', this.report.exams_carried_out);
    addText('Data dos Exames:', new Date(this.report.exames_date).toLocaleDateString(), 4);
  
    // Diagnóstico
    addText('DIAGNÓSTICO:', this.report.diagnosis, 2);
    doc.setDrawColor(0);
    doc.line(marginLeft, cursorY - 2, 190, cursorY - 2); // Linha divisória após Diagnóstico
    cursorY += 4; // Ajuste o cursorY após a linha
  
    // Justificativa Cirúrgica
    addText('JUSTIFICATIVA DA CIRURGIA:', this.report.surgery_justification, 4);
  
    // Procedimentos Indicados (Formato de Lista)
    addText('PROCEDIMENTOS INDICADOS:', this.report.indicated_procedures, 4);
  
    // Benefícios da Intervenção
    addText('BENEFÍCIOS DA INTERVENÇÃO:', this.report.intervention_benefits, 4);
  
    // Conclusão
    addText('CONCLUSÃO:', this.report.conclusion, 8);
  
    // Assinatura do Médico
    doc.setFont('times', 'bold');
    doc.text('Dr. Ronald Barreto', marginLeft, cursorY);
    cursorY += 6;
    doc.setFont('times', 'normal');
    doc.text('CRM: 3807', marginLeft, cursorY);
    cursorY += 6;
    doc.text('Especialista em Ortopedia e Intervenção de Dor', marginLeft, cursorY);
  
    // Salvar o PDF
    doc.save(`Relatorio_${this.report.name}.pdf`);
  }
  
}
