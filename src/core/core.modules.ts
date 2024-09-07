import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LogoComponent } from './components/logo/logo.component'
import { MapComponent } from './components/map/map.component'

@NgModule({
  declarations: [LogoComponent, MapComponent],
  imports: [CommonModule],
  exports: [LogoComponent, MapComponent]
})
export class CoreModule {}
