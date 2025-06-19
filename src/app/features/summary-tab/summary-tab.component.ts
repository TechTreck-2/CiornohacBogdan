import { Component } from '@angular/core';
import { CardTimeoffComponent } from '../../shared/components/card-timeoff/card-timeoff.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ModalSummaryComponent } from '../modal-summary/modal-summary.component';
import { TicketsTableComponent } from '../../shared/components/tickets-table/tickets-table.component';
import { ticketsType } from '../../types/types';
import { TicketsService } from '../../core/services/tickets.service';

@Component({
  selector: 'app-summary-tab',
  standalone: true,
  imports: [
    CardTimeoffComponent,
    ButtonComponent,
    ModalSummaryComponent,
    TicketsTableComponent,
  ],
  templateUrl: './summary-tab.component.html',
  styleUrl: './summary-tab.component.sass',
})
export class SummaryTabComponent {
  showModal = false;
  ticketType: 'Vacanta' | 'Bilet de voie' = 'Vacanta';
  headData = ['Tip', 'Status', 'Start', 'End', 'Durata', 'Actiune'];
  daysOffVacantion = 13;
  daysOffPermissions = 10;
  ticketsData: ticketsType[] = [];
  backupTicket: ticketsType[] = [];

  constructor(private ticketsService: TicketsService) {
    this.ticketsService.getTicketsData().subscribe((data: ticketsType[]) => {
      this.backupTicket = [...data];
      this.ticketsData = data.filter(
        (data) =>
          data.type.trim().toLowerCase() === 'Vacanta'.trim().toLowerCase()
      );
    });
  }

  openModal() {
    this.showModal = true;
  }

  setTicketType(type: 'Vacanta' | 'Bilet de voie') {
    this.ticketType = type;
    this.ticketsData = this.backupTicket.filter(
      (data) => data.type.trim().toLowerCase() === type.trim().toLowerCase()
    );
    console.log(this.ticketsData);
  }

  closeModal() {
    this.showModal = false;
  }

  submitTicket(ticket: ticketsType) {
    if (ticket.type === 'Vacanta') {
      if (this.daysOffVacantion - ticket.duration >= 0) {
        this.daysOffVacantion -= ticket.duration;
        this.ticketsData.push(ticket);
        this.closeModal();
        this.ticketsService.addTicketsData(ticket).subscribe({
          next: (response) => {
            console.log('Ticket added successfully:', response);
          },
        });
      } else {
        alert('Nu aveti zile de vacanta destule!');
      }
    } else if (ticket.type === 'Bilet de voie') {
      if (this.daysOffPermissions - ticket.duration >= 0) {
        this.daysOffPermissions -= ticket.duration;
        this.ticketsData.push(ticket);
        this.closeModal();
        this.ticketsService.addTicketsData(ticket).subscribe({
          next: (response) => {
            console.log('Ticket added successfully:', response);
          },
        });
      } else {
        alert('Nu aveti zile destule pentru biletul de voie!');
      }
    }
  }

  addDaysOff(remaindDays: number) {
    if (this.ticketType === 'Vacanta') {
      this.daysOffVacantion += remaindDays;
    } else {
      this.daysOffPermissions += remaindDays;
    }
  }
}
