
// atualizar-cavalo.component.ts
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CavaloService } from '../../services/cavalo.service';
import { Cavalo } from '../../entities/cavalo';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-atualizar-cavalo',
  standalone: true,
  imports: [MatIconModule, FormsModule, CabecalhoComponent, RodapeComponent],
  templateUrl: './atualizar-cavalo.component.html',
  styleUrls: ['./atualizar-cavalo.component.scss']
})
export class AtualizarCavaloComponent implements OnInit {
  cavalo: Cavalo = {
    nome: '',
    idade: 0,
    tipo: '',
    raca: '',
    pelagem: '',
    genero: '',
    preco: 0,
    disponivelParaCompra: false,
    imagem: undefined
  };
  cavaloId: number | null = null;

  constructor(
    private router: Router,
    private cavaloService: CavaloService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cavaloId = Number(params.get('id'));
      if (this.cavaloId) {
        this.carregarCavalo(this.cavaloId);
      }
    });
  }

  carregarCavalo(id: number): void {
    this.cavaloService.acharPorId(id).subscribe({
      next: (cavalo) => {
        this.cavalo = cavalo;
        this.toastr.info('Dados do cavalo carregados', 'Info', {
          timeOut: 2000,
          progressBar: true
        });
      },
      error: (err) => {
        this.toastr.error('Erro ao carregar o cavalo: ' + err.message, 'Erro!', {
          timeOut: 3000,
          progressBar: true
        });
      }
    });
  }

  onSubmit(): void {
    if (this.validarCamposObrigatorios()) {
      this.atualizarCavalo();
    }
  }

  validarCamposObrigatorios(): boolean {
    let valido = true;

    if (!this.cavalo.nome || this.cavalo.nome.trim() === '') {
      this.toastr.warning('Nome é obrigatório', 'Atenção!');
      valido = false;
    }
    if (!this.cavalo.idade || this.cavalo.idade <= 0) {
      this.toastr.warning('Idade é obrigatória e deve ser maior que zero', 'Atenção!');
      valido = false;
    }
    // Adicione as mesmas validações do componente de cadastro aqui...

    return valido;
  }

  atualizarCavalo(): void {
    const formData = this.criarFormData();
    this.cavaloService.atualizarCavalo(this.cavaloId!, formData).subscribe({
      next: () => {
        this.toastr.success('Cavalo atualizado com sucesso!', 'Sucesso!', {
          timeOut: 3000,
          progressBar: true
        });
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error: (err) => {
        this.toastr.error('Erro ao atualizar o cavalo: ' + err.message, 'Erro!', {
          timeOut: 3000,
          progressBar: true
        });
      }
    });
  }

  criarFormData(): FormData {
    const formData = new FormData();
    formData.append('nome', this.cavalo.nome);
    formData.append('idade', this.cavalo.idade.toString());
    formData.append('tipo', this.cavalo.tipo);
    formData.append('raca', this.cavalo.raca);
    formData.append('pelagem', this.cavalo.pelagem);
    formData.append('genero', this.cavalo.genero);
    formData.append('preco', this.cavalo.preco.toString());
    formData.append('disponivelParaCompra', this.cavalo.disponivelParaCompra.toString());

    if (this.cavalo.imagem) {
      formData.append('imagem', this.cavalo.imagem, this.cavalo.imagem.name);
    }

    return formData;
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.cavalo.imagem = file;
      this.toastr.info('Imagem selecionada com sucesso', 'Info', {
        timeOut: 2000,
        progressBar: true
      });
    }
  }

  cancelar(): void {
    this.toastr.info('Operação cancelada', 'Info', {
      timeOut: 2000,
      progressBar: true
    });
    this.router.navigate(['/']);
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
}