// detalhes-cavalo.component.ts
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { CavaloService } from '../../services/cavalo.service';
import { Cavalo } from '../../entities/cavalo';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-detalhes-cavalo',
  standalone: true,
  imports: [MatIconModule, CabecalhoComponent, RodapeComponent],
  templateUrl: './detalhes-cavalo.component.html',
  styleUrl: './detalhes-cavalo.component.scss'
})
export class DetalhesCavaloComponent implements OnInit {
  cavalo: Cavalo | undefined;

  constructor(
    private route: ActivatedRoute,
    private cavaloService: CavaloService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const cavaloId = Number(this.route.snapshot.paramMap.get('id'));

    this.cavaloService.acharPorId(cavaloId).subscribe({
      next: (cavalo: Cavalo) => {
        this.cavalo = cavalo;
      },
      error: (err) => {
        console.error('Erro ao carregar dados do cavalo:', err);
        this.toastr.error('Não foi possível carregar os dados do cavalo', 'Erro!', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }

  editarCavalo(): void {
    if (this.cavalo) {
      this.router.navigate(['/cavalo/atualizar', this.cavalo.id]);
    }
  }

  apagarCavalo(id: any): void {
    if (this.cavalo) {
      // Adicionar confirmação antes de apagar
      if (confirm('Tem certeza que deseja excluir este cavalo?')) {
        this.cavaloService.apagarCavalo(id).subscribe({
          next: () => {
            this.toastr.success('Cavalo excluído com sucesso!', 'Sucesso!', {
              timeOut: 3000,
              progressBar: true,
              closeButton: true
            });
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Erro ao excluir o cavalo:', err);
            this.toastr.error('Erro ao excluir o cavalo. Tente novamente.', 'Erro!', {
              timeOut: 3000,
              progressBar: true,
              closeButton: true
            });
          }
        });
      }
    }
  }
}

// cadastro.component.ts permanece o mesmo, pois já está implementado corretamente com Toastr