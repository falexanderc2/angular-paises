import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Output()
  public onSelecteMenu: EventEmitter<string> = new EventEmitter<string>()

  public menu = [
    { id: 1, title: 'Por Capital', ruta: 'countries/by-capital' },
    { id: 2, title: 'Por País', ruta: 'countries/by-country' },
    { id: 3, title: 'Por Región', ruta: 'countries/by-region' }
  ]

  emitSelectMenu(value: string): void {
    this.onSelecteMenu.emit(value)
  }

}
