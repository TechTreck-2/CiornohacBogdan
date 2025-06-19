export interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeStorage {
  date: string;
  value: string;
}

export interface rowDatasummary {
  id?: number;
  date: string;
  type: string;
  start: string;
  stop: string;
  duration: string;
}

export interface ticketsType {
  id?: number;
  type: 'Vacanta' | 'Bilet de voie';
  start: string;
  finish: string;
  status: 'Aprobat' | 'In asteptare' | 'Respins';
  duration: number;
}
