import { Component } from '@angular/core';
import { summaryData } from '../../../assets/dummy-summary';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TimerService } from '../../core/services/timer.service';
import { ModalTimeComponent } from '../../features/modal-time/modal-time.component';

interface rowDatasummary {
  date: string;
  type: string;
  start: string;
  stop: string;
  duration: string;
}

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ButtonComponent,
    ModalTimeComponent,
  ],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.sass',
})
export class TimeTableComponent {
  summaryTableData = summaryData;
  showModal = false;
  selectedRow: any = null;
  constructor(private timerService: TimerService) {
    this.timerService.init();
  }

  ngOnInit() {
    this.timerService.isTimeOVer$.subscribe((value) => {
      if (value) {
        this.timerService.dataDay$.subscribe((data) => {
          if (data.date && data.start && data.stop && data.duration) {
            this.summaryTableData.push(data);
          }
        });
      }
    });
  }

  sortDate(isAscending: boolean) {
    if (isAscending) {
      this.summaryTableData.sort((a, b) => a.date.localeCompare(b.date));
    } else {
      this.summaryTableData.sort((a, b) => b.date.localeCompare(a.date));
    }
  }

  triggerModal(rowData: any) {
    this.selectedRow = rowData;
    this.showModal = true;
  }

  deleteRow(rowData: rowDatasummary) {
    this.summaryTableData = this.summaryTableData.filter(
      (row) => !(row.date === rowData.date && row.start === rowData.start)
    );
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.selectedRow = null;
  }

  saveChanges(editedData: rowDatasummary) {
    const index = this.summaryTableData.findIndex(
      (row) => row.date === editedData.date
    );
    if (index !== -1) {
      this.summaryTableData[index] = editedData;
    }
  }
}
