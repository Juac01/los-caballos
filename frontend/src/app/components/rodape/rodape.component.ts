import { Component } from '@angular/core';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.scss'
})
export class RodapeComponent {
faTwitter = faTwitter; 
faLinkedin = faLinkedin; 
faGithub = faGithub;


}
