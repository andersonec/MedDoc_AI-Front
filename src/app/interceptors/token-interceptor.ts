import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Recupera o token do localStorage (ou de outro serviço de autenticação)
    const token = localStorage.getItem('token');

    console.log("Interceptor: " + token)
    
    // Se o token existir, clona a requisição e adiciona o header 'Authorization'
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    // Encaminha a requisição modificada ou original
    return next.handle(request);
  }
}
