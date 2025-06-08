import { Component } from '@angular/core';
import { CardTimeoffComponent } from '../../shared/components/card-timeoff/card-timeoff.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ModalSummaryComponent } from '../modal-summary/modal-summary.component';
import { TicketsTableComponent } from '../../shared/components/tickets-table/tickets-table.component';
import {
  vacationTickets,
  permissionsTickets,
} from '../../../assets/dummy-summary';
import { ticketsType } from '../../types/types';

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
  ticketsData: ticketsType[] = vacationTickets;

  openModal() {
    this.showModal = true;
  }

  setTicketType(type: 'Vacanta' | 'Bilet de voie') {
    this.ticketType = type;
    this.ticketsData =
      type === 'Vacanta' ? vacationTickets : permissionsTickets;
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
      } else {
        alert('Nu aveti zile de vacanta destule!');
      }
    } else if (ticket.type === 'Bilet de voie') {
      if (this.daysOffPermissions - ticket.duration >= 0) {
        this.daysOffPermissions -= ticket.duration;
        this.ticketsData.push(ticket);
        this.closeModal();
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
