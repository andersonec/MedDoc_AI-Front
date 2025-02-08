import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: AxiosInstance;

  constructor(private router: Router) {
    this.api = axios.create({
      baseURL: environment.API_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': environment.API_KEY
      }
    });

    // Configura o interceptor para adicionar o token automaticamente
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async login(userName: string, password: string, authenticate: boolean): Promise<AxiosResponse<any>> {
    const body = {
      user_name: userName,
      password: password
    };

    try {
      const response = await this.api.post('/login', body)
        .then(response => {
          if (authenticate) {
            // Armazenar os dados no localStorage
            localStorage.setItem('user_name', userName);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          return response;
        })
        .catch(error => {
          console.error('Login failed:', error);
          throw error;
        });

      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async newReport(formData: FormData): Promise<Observable<any>> {
    try {
      const response = await this.api.post('/responsibles/reports', formData)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.error('deleteReport failed:', error);
          throw error;
        });

      return response.data;
    } catch (error) {
      console.error('Erro ao criar novo relatório:', error);
      throw error;
    }
  }

  async getAllReports(): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.get('/responsibles/reports')
        .then(response => {
          return response;
        })
        .catch(error => {
          console.error('getAllReports failed:', error);
          throw error;
        });

      return response;
    } catch (error) {
      console.error('Erro ao consultar histórico:', error);
      throw error;
    }
  }

  async getReport(id: number): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.get('/responsibles/reports/' + id)
        .then(response => {
          return response;
        })
        .catch(error => {
          console.error('getReport failed:', error);
          throw error;
        });

      return response;
    } catch (error) {
      console.error('Erro ao consultar relatório:', error);
      throw error;
    }
  }

  async deleteReport(id: number): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.delete('/responsibles/reports/' + id)
        .then(response => {
          return response;
        })
        .catch(error => {
          console.error('deleteReport failed:', error);
          throw error;
        });

      return response;
    } catch (error) {
      console.error('Erro ao excluir relatório:', error);
      throw error;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_name');
    this.router.navigate(['/login']);
  }

  getUserName(): any {
    return localStorage.getItem('user_name');
  }
}
