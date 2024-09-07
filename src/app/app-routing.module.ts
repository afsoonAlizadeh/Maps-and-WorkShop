import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenService } from '../auth/services/token.service';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('../pages/pages.modules').then((m) => m.PagesModule),
      resolve : {
        appData: TokenService
      }
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
