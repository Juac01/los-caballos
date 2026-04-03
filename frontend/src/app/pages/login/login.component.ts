// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/login.service';
import { Usuario } from '../../entities/login';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [AuthService],  // Adicionando o provider aqui
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    usuario: Usuario = {
        email: '',  // ou username, dependendo da sua interface
        senha: ''
    };
    errorMessage: string = '';

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    // voltar(): void {
    //     this.router.navigate(['/']);
    // }

    cadastro(): void {
      this.router.navigate(['usuario/cadastrar']);
    }

    onSubmit(): void {
        this.errorMessage = '';
        
        this.authService.login(this.usuario).subscribe({
            next: (response) => {
                localStorage.setItem('usuario', JSON.stringify(response));
                this.router.navigate(['/home']);
            },
            error: (error) => {
                if (error.status === 401) {
                    this.errorMessage = 'Usuário ou senha inválidos';
                } else {
                    this.errorMessage = 'Erro ao realizar login. Tente novamente.';
                }
            }
        });
    }
}
