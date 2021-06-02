import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {DashboardComponent} from './pages/dasboard/dashboard.component';
import {PetitionsComponent} from './pages/petitions/petitions.component';
import {PetitionComponent} from './pages/petition/petition.component';
import {CreatePetitionComponent} from './pages/create-petition/create-petition.component';
import {AuthComponent} from './pages/auth/auth.component';
import {SignupComponent} from './pages/signup/signup.component';
import {PetitionsGuard} from './shared/guards/petitions.guard';
import {LogedinGuard} from './shared/guards/logedin.guard';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'petitions', component: PetitionsComponent},
      {path: 'petitions/:id', component: PetitionComponent},
      {path: 'create', component: CreatePetitionComponent, canActivate: [PetitionsGuard]},
      {path: 'auth', component: AuthComponent, canActivate: [LogedinGuard]},
      {path: 'auth/:continue', component: AuthComponent, canActivate: [LogedinGuard]},
      {path: 'signup', component: SignupComponent, canActivate: [LogedinGuard]}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
