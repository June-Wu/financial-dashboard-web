import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  }, {
    path: 'overview',
    redirectTo: 'overview'
  }, {
    path: 'accounts',
    redirectTo: 'accounts'
  }, {
    path: 'market',
    redirectTo: 'market'
  }, {
    path: 'user-profile',
    redirectTo: 'user-profile'
  }, {
    path: 'banking',
    redirectTo: 'banking'
  }, {
    path: 'investments',
    redirectTo: 'investments'
  }, {
    path: 'account-history',
    redirectTo: 'account-history'
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
