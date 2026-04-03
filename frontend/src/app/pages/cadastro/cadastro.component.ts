import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/login.service';
import { Usuario } from '../../entities/cadastro';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  email: string = '';
  cpf: string = '';
  senha: string = '';
  mensagemErro: string = '';
 
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  login(): void {
    this.router.navigate(['']);
  }

  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto;

    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  cadastrar(): void {
    // Verificar campos vazios
    if (!this.email || !this.cpf || !this.senha) {
      if (!this.email) {
        this.toastr.warning('O campo de email deve ser preenchido.', 'Atenção!', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
      }
      
      if (!this.cpf) {
        this.toastr.warning('O campo de CPF deve ser preenchido.', 'Atenção!', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
      }
      
      if (!this.senha) {
        this.toastr.warning('O campo de senha deve ser preenchido.', 'Atenção!', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
      }
      return;
    }

    // Validar CPF
    if (!this.validarCPF(this.cpf)) {
      this.toastr.error('CPF inválido. Por favor, insira um CPF válido.', 'Erro!', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true
      });
      return;
    }

    const usuario: Usuario = {
      email: this.email,
      cpf: this.cpf,
      senha: this.senha
    };

    this.authService.cadastrar(usuario).subscribe({
      next: (response) => {
        this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso!', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.error('Erro no cadastro:', error);
        this.toastr.error('Erro ao realizar cadastro. Tente novamente.', 'Erro!', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
      }
    });
  }
}