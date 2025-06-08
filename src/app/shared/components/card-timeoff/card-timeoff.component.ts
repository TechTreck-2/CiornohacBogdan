import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-timeoff',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './card-timeoff.component.html',
  styleUrl: './card-timeoff.component.sass',
})
export class CardTimeoffComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) daysRemained!: number;
  @Output() changeType = new EventEmitter<void>();

  onchangeType() {
    this.changeType.emit();
  }
}
