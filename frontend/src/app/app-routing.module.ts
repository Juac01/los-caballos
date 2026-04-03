import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DetalhesCavaloComponent } from "./pages/detalhes-cavalo/detalhes-cavalo.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { CadastrarCavaloComponent } from "./pages/cadastrar-cavalo/cadastrar-cavalo.component";
import { AtualizarCavaloComponent } from "./pages/atualizar-cavalo/atualizar-cavalo.component";
import { CadastroComponent } from "./pages/cadastro/cadastro.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'usuario/cadastrar', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cavalo/cadastrar', component: CadastrarCavaloComponent },
  { path: 'cavalo/:id', component: DetalhesCavaloComponent },
  { path: 'cavalo/atualizar/:id', component: AtualizarCavaloComponent },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }