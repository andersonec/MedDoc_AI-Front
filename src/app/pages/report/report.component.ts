import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportState } from './report-state.model'; // Se criou um arquivo separado

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
}
