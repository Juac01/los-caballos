// cadastrar-cavalo.component.ts
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CavaloService } from '../../services/cavalo.service';
import { Cavalo } from '../../entities/cavalo';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-cadastrar-cavalo',
  standalone: true,
  imports: [MatIconModule, FormsModule, CabecalhoComponent, RodapeComponent],
  templateUrl: './cadastrar-cavalo.component.html',
  styleUrl: './cadastrar-cavalo.component.scss'
})
export class CadastrarCavaloComponent implements OnInit {
  cavalo: Cavalo = {
    nome: '',
    idade: 0,
    tipo: 'Corrida',
    raca: '',
    pelagem: '',
    genero: '',
    preco: 0,
    disponivelParaCompra: false,
    imagem: undefined
  };

  constructor(
    private router: Router, 
    private cavaloService: CavaloService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  voltar(): void {
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    if (this.validarCamposObrigatorios()) {
      this.cadastrarCavalo();
    }
  }

  validarCamposObrigatorios(): boolean {
    let valido = true;

    if (!this.cavalo.nome || this.cavalo.nome.trim() === '') {
      this.toastr.warning('Nome é obrigatório', 'Atenção!', {
        timeOut: 3000,
        progressBar: true
      });
      valido = false;
    }
    if (!this.cavalo.idade || this.cavalo.idade <= 0) {
      this.toastr.warning('Idade é obrigatória e deve ser maior que zero', 'Atenção!', {
        timeOut: 3000,
        progressBar: true
      });
      valido = false;
    }
    if (!this.cavalo.tipo || this.cavalo.tipo.trim() === '') {
      this.toastr.warning('Tipo é obrigatório', 'Atenção!', {
        timeOut: 3000,
        progressBar: true
      });
      valido = false;
    }
    if (!this.cavalo.raca || this.cavalo.raca.trim() === '') {
      this.toastr.warning('Raça é obrigatória', 'Atenção!', {
        timeOut: 3000,
        progressBar: true
      });
      valido = false;
    }
    if (!this.cavalo.genero || this.cavalo.genero.trim() === '') {
      this.toastr.warning('Gênero é obrigatório', 'Atenção!', {
        timeOut: 3000,
        progressBar: true
      });
      valido = false;
    }
    if (this.cavalo.preco <= 0) {
      this.toastr.warning('Preço é obrigatório e deve ser maior que zero', 'Atenção!', {
        timeOut: 3000,
        progressBar: true
      });
      valido = false;
    }
    if (!this.cavalo.imagem) {
      this.toastr.warning('Imagem é obrigatória', 'Atenção!', {
        timeOut: 3000,
        progressBar: true
      });
      valido = false;
    }

    return valido;
  }

  cadastrarCavalo(): void {
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

    this.cavaloService.inserirCavalo(formData).subscribe({
      next: () => {
        this.toastr.success('Cavalo cadastrado com sucesso!', 'Sucesso!', {
          timeOut: 3000,
          progressBar: true
        });
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error('Erro ao cadastrar cavalo: ' + err.message, 'Erro!', {
          timeOut: 3000,
          progressBar: true
        });
      }
    });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.cavalo.imagem = file;
    }
  }
}
