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
  date: string;
  type: string;
  start: string;
  stop: string;
  duration: string;
}

export interface ticketsType {
  type: 'Vacanta' | 'Bilet de voie';
  start: string;
  end: string;
  status: 'Aprobat' | 'In asteptare' | 'Respins';
  duration: number;
}
