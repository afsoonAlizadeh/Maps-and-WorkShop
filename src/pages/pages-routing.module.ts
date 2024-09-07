import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'workStore',
    loadChildren: () =>
      import('../pages/components/workshops/workshop.modules').then((m) => m.WorkShopsModule),
  },
  { path: '', redirectTo: 'workStore', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
