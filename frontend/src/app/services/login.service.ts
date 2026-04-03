// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/login';
import { environment } from '../environments/envinronment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl2 = environment.baseUrl2;

    constructor(private http: HttpClient,    private snackBar: MatSnackBar
    ) {}

    login(usuario: Usuario): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        // Log the request details (for debugging)
        console.log('Request URL:', `${this.baseUrl2}/login`);
        console.log('Request payload:', usuario);

        return this.http.post<any>(
            `${this.baseUrl2}/login`, 
            usuario,
            { headers: headers }
        );
    }
    cadastrar(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.baseUrl2, usuario);
      }
      
  message(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}