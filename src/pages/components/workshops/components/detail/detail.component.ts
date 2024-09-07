import { Component, EventEmitter, Input, Output } from '@angular/core'
import { InformationCompony } from '../../interfaces/work-shop'

@Component({
  selector: 'app-detail-work-shop',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailWorkShopComponent {
  @Input() detailInfo: InformationCompony = {} as InformationCompony
  @Output() isOpen: EventEmitter<boolean> = new EventEmitter()

  constructor () {}
}
