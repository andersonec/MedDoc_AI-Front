import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const user_name = this.loginForm.get('user_name')?.value;
        const password = this.loginForm.get('password')?.value;

        const response = await this.apiService.login(user_name, password, true);

        console.log(response)

        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        this.errorMessage = 'Erro ao fazer login, verifique suas credenciais.';
      }
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }
}
