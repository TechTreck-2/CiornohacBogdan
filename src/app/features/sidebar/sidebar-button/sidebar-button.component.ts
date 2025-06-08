import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.sass',
})
export class SidebarButtonComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) type!: 'pontare' | 'sumar';
  @Input({ required: true }) active!: boolean;
  @Input({ required: true }) icon!: string;
  @Output() select = new EventEmitter<'pontare' | 'sumar'>();

  onSelectTab() {
    this.select.emit(this.type);
  }
}
