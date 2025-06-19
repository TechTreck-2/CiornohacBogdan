import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ticketsType } from '../../../types/types';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TicketsService } from '../../../core/services/tickets.service';

@Component({
  selector: 'app-tickets-table',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './tickets-table.component.html',
  styleUrl: './tickets-table.component.sass',
})
export class TicketsTableComponent {
  @Input({ required: true }) tableDataHead!: string[];
  @Input({ required: true }) ticketsTableData!: ticketsType[];
  @Output() addDaysOff = new EventEmitter<number>();

  constructor(private ticketsService: TicketsService) {}

  startDate = '';
  endDate = '';

  private backupTickets: ticketsType[] = [];

  ngOnInit() {
    this.backupTickets = [...this.ticketsTableData];
  }

  deteleteTicket(ticket: ticketsType) {
    this.addDaysOff.emit(ticket.duration);
    if (ticket.id !== undefined) {
      this.ticketsService.deleteTicketsData(ticket.id).subscribe({
        next: (response) => {
          console.log('Ticket deleted successfully:', response);
        },
        error: (error) => {
          console.error('Error deleting ticket:', error);
        },
      });
      this.ticketsTableData = this.ticketsTableData.filter((t) => t !== ticket);
      this.backupTickets = [...this.ticketsTableData];
    } else {
      console.error('Cannot delete ticket: ticket.id is undefined');
    }
  }

  filterTickets() {
    let start = new Date(this.startDate);
    let end = new Date(this.endDate);
    if (end < start) {
      alert('Data de start trebuie sa fie mai mica decat data de sfarsit!');
    }
    this.ticketsTableData = this.ticketsTableData.filter((ticket) => {
      let ticketDate = new Date(ticket.start);
      return ticketDate >= start && ticketDate <= end;
    });
  }

  resetFilter() {
    this.startDate = '';
    this.endDate = '';
    this.ticketsTableData = [...this.backupTickets];
  }
  sortDate(isAscending: boolean, type: 'Start' | 'End' | 'Durata') {
    if (type === 'Start') {
      this.sortByStartDate(isAscending);
    } else if (type === 'End') {
      this.sortByEndDate(isAscending);
    } else if (type === 'Durata') {
      this.sortByDuration(isAscending);
    }
  }

  private sortByStartDate(isAscending: boolean) {
    this.ticketsTableData.sort((a, b) => {
      return isAscending
        ? a.start.localeCompare(b.start)
        : b.start.localeCompare(a.start);
    });
  }

  private sortByEndDate(isAscending: boolean) {
    this.ticketsTableData.sort((a, b) => {
      return isAscending
        ? a.finish.localeCompare(b.finish)
        : b.finish.localeCompare(a.finish);
    });
  }
  private sortByDuration(isAscending: boolean) {
    this.ticketsTableData.sort((a, b) => {
      return isAscending ? a.duration - b.duration : b.duration - a.duration;
    });
  }
}
