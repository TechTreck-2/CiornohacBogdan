import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/environment';
import { rowDatasummary } from '../../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeTableService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTimeTableData(): Observable<rowDatasummary[]> {
    return this.http.get<rowDatasummary[]>(`${this.apiUrl}/time`);
  }

  getTimeTableDataById(id: number) {
    return this.http.get(`${this.apiUrl}/time/${id}`);
  }

  addTimeTableData(data: rowDatasummary) {
    return this.http.post(`${this.apiUrl}/time`, data);
  }

  deleteTimeTableData(id: number) {
    return this.http.delete(`${this.apiUrl}/time/${id}`);
  }

  updateTimeTableData(
    id: number,
    start: string,
    stop: string,
    duration: string
  ) {
    return this.http.put(`${this.apiUrl}/time/${id}`, {
      start,
      stop,
      duration,
    });
  }
}
