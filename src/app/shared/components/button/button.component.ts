import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.sass',
})
export class ButtonComponent {
  @Input({ required: true }) name!: string;
  @Input() disabled = false;
  @Output() onClick = new EventEmitter();

  onClickButton() {
    this.onClick.emit();
  }
}
