import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//nossos componentes 
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { CardCavaloComponent } from './components/card-cavalo/card-cavalo.component';
import { RodapeComponent } from './components/rodape/rodape.component';

import { AppRoutingModule } from './app-routing.module';

//páginas
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarCavaloComponent } from './pages/cadastrar-cavalo/cadastrar-cavalo.component';
import { DetalhesCavaloComponent } from './pages/detalhes-cavalo/detalhes-cavalo.component';
import { AtualizarCavaloComponent } from './pages/atualizar-cavalo/atualizar-cavalo.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

//icones
import {MatIconModule} from '@angular/material/icon'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CabecalhoComponent,
    CardCavaloComponent,
    RodapeComponent,
    AppRoutingModule,
    
    HomeComponent,
    LoginComponent,
    CadastrarCavaloComponent,
    DetalhesCavaloComponent,
    AtualizarCavaloComponent,
    CadastroComponent,

    MatIconModule,
    BrowserModule,
    RouterModule,
    FontAwesomeModule,

    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
