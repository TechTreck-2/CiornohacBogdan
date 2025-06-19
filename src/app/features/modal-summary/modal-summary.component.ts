import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '../../shared/components/button/button.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ticketsType } from '../../types/types';
import { getDaysBetween } from '../../core/functions/daysBetween';

@Component({
  selector: 'app-modal-summary',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatIcon,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-summary.component.html',
  styleUrl: './modal-summary.component.sass',
})
export class ModalSummaryComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<ticketsType>();
  @Input({ required: true }) ticketType!: 'Vacanta' | 'Bilet de voie';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  daysOff = 0;

  constructor() {
    this.range.valueChanges.subscribe(() => this.updateDaysOff());
  }

  closeModalOnBackdrop(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  updateDaysOff() {
    const start = this.range.value.start;
    const end = this.range.value.end;

    if (start && end) {
      this.daysOff = getDaysBetween(
        start.toISOString().split('T')[0],
        end.toISOString().split('T')[0]
      );
    } else {
      this.daysOff = 0;
    }
  }

  closeModal() {
    this.close.emit();
  }
  submitTicket() {
    const start = this.range.value.start;
    const end = this.range.value.end;

    if (start && end) {
      const ticket: ticketsType = {
        type: this.ticketType,
        status: 'In asteptare',
        start: start.toISOString().split('T')[0],
        finish: end.toISOString().split('T')[0],
        duration: this.daysOff,
      };
      this.submit.emit(ticket);
    }
  }
}
