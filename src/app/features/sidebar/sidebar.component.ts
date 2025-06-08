import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass',
})
export class SidebarComponent {
  @Output() tabChanged = new EventEmitter<'pontare' | 'sumar'>();
  activTab: 'pontare' | 'sumar' = 'pontare';

  onSelectBtn(type: 'pontare' | 'sumar') {
    this.activTab = type;
    this.tabChanged.emit(type);
  }
}
