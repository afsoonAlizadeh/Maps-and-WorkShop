import { Component, EventEmitter, Input, Output } from '@angular/core'
import { InformationCompony } from '../../interfaces/work-shop'

@Component({
  selector: 'app-work-shop-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class WorkStoreListComponent {
  @Input() detail: InformationCompony = {} as InformationCompony
  @Output() detailId: EventEmitter<number> = new EventEmitter()

  constructor () {}
  sendIdToParent (id: number) {
    this.detailId.emit(id)
  }
}
