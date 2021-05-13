import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {PetitionsComponent} from './petitions/petitions.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/petitions', pathMatch: 'full'},
      {path: 'petitions', component: PetitionsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
