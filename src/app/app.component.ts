import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}

  imagemUrl = './assets/name_no_background.png';

  logout(): void {
    // Remove o token (e outros dados, se necessário) do armazenamento
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_name');
    // Redireciona para a página de login
    this.router.navigate(['/login']);
  }

  shouldShowHeader(): boolean {
    return this.router.url !== '/login'; // Oculta o header apenas na página de login
  }
}
