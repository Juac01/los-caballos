import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-cavalo',
  standalone: true,
  imports: [],
  templateUrl: './card-cavalo.component.html',
  styleUrl: './card-cavalo.component.scss'
})
export class CardCavaloComponent {
constructor(private router: Router) {}


  @Input() cavalo: any;

  verDetalhes(cavaloId: number): void {
    this.router.navigate([`/cavalo/${cavaloId}`]);
  }

}
