import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [],
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {
  isAdmin: boolean = false; // Estado inicial: deslogado

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus(); // Verifica o estado de login ao carregar
  }

  checkLoginStatus(): void {
    const usuario = localStorage.getItem('usuario');
    this.isAdmin = !!usuario; // Converte para booleano, verdadeiro se houver um usuário armazenado
  }

  toggleLogin(): void {
    if (this.isAdmin) {
      this.logout(); // Ação para deslogar
    } else {
      this.login(); // Ação para logar (geralmente não será chamado diretamente)
    }
  }

  login(): void {
    console.log('Redirecionando para a página de login...');
    this.router.navigate(['/home']);
  }

  logout(): void {
    console.log('Usuário deslogado.');
    localStorage.removeItem('usuario'); // Remove o usuário do LocalStorage
    this.isAdmin = false; // Atualiza o estado de autenticação
    this.router.navigate(['/']); // Redireciona para a página inicial
  }
}
