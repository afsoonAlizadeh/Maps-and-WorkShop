import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DetailWorkShopComponent } from './components/detail/detail.component'
import { WorkStoreListComponent } from './components/list/list.component'
import { WorkStoreComponent } from './components/workStore/workStore.component'
import { WorkShopRoutingModule } from './workshop-routing.module'
import { CoreModule } from '../../../core/core.modules'

@NgModule({
  declarations: [
    WorkStoreComponent,
    WorkStoreListComponent,
    DetailWorkShopComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    WorkShopRoutingModule,
    CoreModule
  ],
  providers: []
})
export class WorkShopsModule {}
