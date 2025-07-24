import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TicketsService } from './tickets.service';
import { environment } from '../../../enviroments/environment';
import { ticketsType } from '../../types/types';

describe('TicketsService', () => {
  let service: TicketsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketsService],
    });
    service = TestBed.inject(TicketsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tickets data', () => {
    const mockTickets: ticketsType[] = [
      {
        id: 1,
        type: 'Vacanta',
        start: '2024-01-01',
        finish: '2024-01-21',
        status: 'In asteptare',
        duration: 120,
      },
      {
        id: 2,
        type: 'Bilet de voie',
        start: '2024-01-02',
        finish: '2024-01-02',
        status: 'Aprobat',
        duration: 1,
      },
    ];

    service.getTicketsData().subscribe((tickets) => {
      expect(tickets).toEqual(mockTickets);
    });

    const req = httpMock.expectOne(`${apiUrl}/tickets`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTickets);
  });

  it('should add ticket data', () => {
    const newTicket: ticketsType = {
      type: 'Bilet de voie',
      start: '2024-01-02',
      finish: '2024-01-02',
      status: 'Aprobat',
      duration: 1,
    } as ticketsType;

    service.addTicketsData(newTicket).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/tickets`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTicket);
    req.flush({ success: true });
  });

  it('should delete ticket data', () => {
    const ticketId = 1;

    service.deleteTicketsData(ticketId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/tickets/${ticketId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });
});
