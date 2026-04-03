import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardCavaloComponent } from '../../components/card-cavalo/card-cavalo.component';
import { CavaloService } from '../../services/cavalo.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, CardCavaloComponent, FormsModule, CabecalhoComponent, RodapeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listaCavalos: any[] = [];
  listaFiltrada: any[] = [];
  menuFiltrosAberto = false;
  filtros = {
    disponivel: false,
    indisponivel: false
  };

  constructor(private router: Router, private cavaloService: CavaloService) {}

  abrirMenuFiltros(): void {
    this.menuFiltrosAberto = !this.menuFiltrosAberto;
  }

  aplicarFiltros(): void {
    const { disponivel, indisponivel } = this.filtros;

    this.listaFiltrada = this.listaCavalos.filter(cavalo => {
      if (disponivel && !cavalo.disponivelParaCompra) return false;
      if (indisponivel && cavalo.disponivelParaCompra) return false;
      return true;
    });

    if (!disponivel && !indisponivel) {
      this.listaFiltrada = [...this.listaCavalos];
    }

    this.menuFiltrosAberto = false;
  }

  atualizarFiltros(filtroAtivado: string): void {
    if (filtroAtivado === 'disponivel') {
      this.filtros.indisponivel = false; // Desmarca o filtro "Indisponíveis"
    } else if (filtroAtivado === 'indisponivel') {
      this.filtros.disponivel = false; // Desmarca o filtro "Disponíveis"
    }
  }
  
  ngOnInit(): void {
    this.cavaloService.listarCavalo().subscribe(
      data => {
        this.listaCavalos = data; // Lista original
        this.listaFiltrada = [...this.listaCavalos]; // exibe todos os cavalos
      },
      error => {
        console.error('Erro ao buscar cavalos', error);
      }
    );
  }

  verDetalhes(cavaloId: number): void {
    this.router.navigate([`/cavalo/${cavaloId}`]);
  }

  adicionarCavalo(): void {
    this.router.navigate(['/cavalo/cadastrar']);
  }
}
