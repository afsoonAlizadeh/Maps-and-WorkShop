import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DetailWorkShopComponent } from './components/detail/detail.component'
import { WorkStoreComponent } from './components/workStore/workStore.component'

const routes: Routes = [
  {
    path: '',
    component: WorkStoreComponent
  },
  {
    path: 'detail/:id',
    component: DetailWorkShopComponent
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkShopRoutingModule {}
