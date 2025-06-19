import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { rowDatasummary } from '../../types/types';
import { HttpClientModule } from '@angular/common/http';
import { TimeTableService } from '../../core/services/time-table-service.service';

@Component({
  selector: 'app-modal-time',
  standalone: true,
  imports: [MatIconModule, ButtonComponent, FormsModule, HttpClientModule],
  templateUrl: './modal-time.component.html',
  styleUrl: './modal-time.component.sass',
})
export class ModalTimeComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<rowDatasummary>();
  @Output() delete = new EventEmitter<rowDatasummary>();
  @Input() data: any;

  constructor(private timeTableService: TimeTableService) {}

  editedData: any;
  startHour: number = 0;
  endHour: number = 0;
  startMinute: number = 0;
  endMinute: number = 0;

  ngOnInit() {
    this.editedData = { ...this.data };
    this.startHour = Number(this.data.start.split(':')[0]);
    this.startMinute = Number(this.data.start.split(':')[1]);
    this.endHour = Number(this.data.stop.split(':')[0]);
    this.endMinute = Number(this.data.stop.split(':')[1]);
  }

  validateMinutes() {
    if (this.startMinute >= 60) this.startMinute = 59;
    if (this.endMinute >= 60) this.endMinute = 59;
    if (this.startMinute < 0) this.startMinute = 0;
    if (this.endMinute < 0) this.endMinute = 0;
  }

  calculateDuration(): string {
    this.startHour = Number(this.startHour);
    this.endHour = Number(this.endHour);
    this.startMinute = Number(this.startMinute);
    this.endMinute = Number(this.endMinute);

    this.validateMinutes();
    const startInMinuts = this.startHour * 60 + this.startMinute;
    const endInMinuts = this.endHour * 60 + this.endMinute;
    let durationInMinutes = endInMinuts - startInMinuts;
    if (durationInMinutes < 0) {
      durationInMinutes += 24 * 60;
    }
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${this.formattedTime(hours)}:${this.formattedTime(minutes)}`;
  }

  closeModalOnBackdrop(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  closeModalOnButton(event: Event) {
    event.stopPropagation();
    this.closeModal();
  }

  deleteRow() {
    this.timeTableService.deleteTimeTableData(this.data.id).subscribe(() => {
      console.log('Row deleted successfully');
    });
    this.delete.emit(this.data);
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }

  formattedTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  saveChanges() {
    if (this.calculateDuration() !== '08:00') {
      alert('Durata trebuie sa fie 08:00!');
    } else {
      this.editedData.start = `${this.formattedTime(
        this.startHour
      )}:${this.formattedTime(this.startMinute)}`;
      this.editedData.stop = `${this.formattedTime(
        this.endHour
      )}:${this.formattedTime(this.endMinute)}`;
      this.editedData.duration = this.calculateDuration();
      this.timeTableService
        .updateTimeTableData(
          this.editedData.id,
          this.editedData.start,
          this.editedData.stop,
          this.editedData.duration
        )
        .subscribe(() => {
          console.log('Row updated successfully');
        });
      this.save.emit(this.editedData);
      this.closeModal();
    }
  }
}
