import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/environment';
import { ticketsType } from '../../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTicketsData(): Observable<ticketsType[]> {
    return this.http.get<ticketsType[]>(`${this.apiUrl}/tickets`);
  }

  addTicketsData(data: ticketsType) {
    return this.http.post(`${this.apiUrl}/tickets`, data);
  }

  deleteTicketsData(id: number) {
    return this.http.delete(`${this.apiUrl}/tickets/${id}`);
  }
}
