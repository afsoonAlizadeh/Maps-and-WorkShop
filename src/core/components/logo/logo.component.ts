import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() isDelete: boolean = false
  @Output() isClose: EventEmitter<boolean> = new EventEmitter()

  close () {
    this.isClose.emit(false)
  }
}
