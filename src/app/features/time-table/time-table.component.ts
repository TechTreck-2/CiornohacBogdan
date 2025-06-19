import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TimerService } from '../../core/services/timer.service';
import { TimeTableService } from '../../core/services/time-table-service.service';
import { ModalTimeComponent } from '../../features/modal-time/modal-time.component';
import { rowDatasummary } from '../../types/types';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ButtonComponent,
    ModalTimeComponent,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.sass',
})
export class TimeTableComponent implements OnInit {
  summaryTableData: rowDatasummary[] = [];
  showModal = false;
  selectedRow: any = null;
  constructor(
    private timerService: TimerService,
    private timeTableService: TimeTableService
  ) {
    this.timerService.init();
    this.timeTableService
      .getTimeTableData()
      .subscribe((data: rowDatasummary[]) => {
        this.summaryTableData = data;
      });

    this.summaryTableData = this.summaryTableData.map((row) => ({
      ...row,
      date: row.date.split('T')[0],
    }));
    console.log(this.summaryTableData);
  }

  ngOnInit() {
    this.timerService.isTimeOVer$.subscribe((value) => {
      if (value) {
        this.timerService.dataDay$.subscribe((data) => {
          if (data.date && data.start && data.stop && data.duration) {
            this.timeTableService.addTimeTableData(data).subscribe({
              next: (response) => {
                this.summaryTableData.push(data);
                console.log('Data saved successfully:', response);
              },
            });
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
    this.selectedRow = this.summaryTableData.find(
      (row) => row.id === rowData.id
    );
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
