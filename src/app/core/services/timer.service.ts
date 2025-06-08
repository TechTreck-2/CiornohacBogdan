import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

export type RowDataSummary = {
  date: string;
  type: string;
  start: string;
  stop: string;
  duration: string;
};

@Injectable({ providedIn: 'root' })
export class TimerService {
  private timeSpentSaved: any = null;
  private timeLeftSaved: any = null;

  private isTimeOver = new BehaviorSubject<boolean>(false);
  isTimeOVer$ = this.isTimeOver.asObservable();

  private hoursRemained = new BehaviorSubject<number>(0);
  private minutesRemained = new BehaviorSubject<number>(0);
  private secondsRemained = new BehaviorSubject<number>(10);

  private hoursWorked = new BehaviorSubject<number>(0);
  private minutesWorked = new BehaviorSubject<number>(0);
  private secondsWorked = new BehaviorSubject<number>(0);

  private currentDate = new Date().toISOString().split('T')[0];

  intervalSubscription: Subscription | null = null;

  private timeSpent = new BehaviorSubject<string>('00:00:00');
  timeSpent$ = this.timeSpent.asObservable();

  private timeLeft = new BehaviorSubject<string>('00:00:00');
  timeLeft$ = this.timeLeft.asObservable();

  private dataOfDayWorked = new BehaviorSubject<RowDataSummary>({
    date: '',
    type: 'Pontat',
    start: '',
    stop: '',
    duration: '',
  });
  dataDay$ = this.dataOfDayWorked.asObservable();

  private startTime = new BehaviorSubject<string>('--:--:--');
  startTime$ = this.startTime.asObservable();

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    this.saveToStorage('time-left', this.timeLeft.value);
    this.saveToStorage('time-spent', this.timeSpent.value);
  }

  private formatUnit(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  private generateFormatTime(h: number, m: number, s: number): string {
    return `${this.formatUnit(h)}:${this.formatUnit(m)}:${this.formatUnit(s)}`;
  }

  private updateFormattedTime(
    hours$: BehaviorSubject<number>,
    minutes$: BehaviorSubject<number>,
    seconds$: BehaviorSubject<number>,
    target$: BehaviorSubject<string>
  ) {
    target$.next(
      this.generateFormatTime(
        hours$.getValue(),
        minutes$.getValue(),
        seconds$.getValue()
      )
    );
  }

  private saveToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify([this.currentDate, value]));
  }

  private getFromStorage(key: string): [string, string] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  init() {
    if (typeof window === 'undefined') return;

    this.timeSpentSaved = this.getFromStorage('time-spent');
    this.timeLeftSaved = this.getFromStorage('time-left');

    if (this.timeLeftSaved?.[0] === this.currentDate) {
      const [h, m, s] = this.timeLeftSaved[1].split(':').map(Number);
      this.hoursRemained.next(h);
      this.minutesRemained.next(m);
      this.secondsRemained.next(s);
      this.updateFormattedTime(
        this.hoursRemained,
        this.minutesRemained,
        this.secondsRemained,
        this.timeLeft
      );
    }

    if (this.timeSpentSaved?.[0] === this.currentDate) {
      const [h, m, s] = this.timeSpentSaved[1].split(':').map(Number);
      this.hoursWorked.next(h);
      this.minutesWorked.next(m);
      this.secondsWorked.next(s);
      this.updateFormattedTime(
        this.hoursWorked,
        this.minutesWorked,
        this.secondsWorked,
        this.timeSpent
      );
    }

    this.isTimeOver.next(this.timeLeft.getValue() === '00:00:00');

    const startTime = this.getFromStorage('start-time');
    this.startTime.next(startTime ? startTime[1] : '--:--:--');
  }

  onStartTimer() {
    if (this.intervalSubscription || this.isTimeOver.getValue()) return;

    if (!localStorage.getItem('start-time')) {
      const start = new Date().toISOString().split('T')[1].split('.')[0];
      this.startTime.next(start);
      this.saveToStorage('start-time', start);
    }

    this.intervalSubscription = interval(1000).subscribe(() => {
      this.tickWorked();
      this.tickRemaining();

      this.updateFormattedTime(
        this.hoursWorked,
        this.minutesWorked,
        this.secondsWorked,
        this.timeSpent
      );
      this.updateFormattedTime(
        this.hoursRemained,
        this.minutesRemained,
        this.secondsRemained,
        this.timeLeft
      );

      if (this.timeLeft.getValue() === '00:00:00') {
        this.isTimeOver.next(true);
        this.onStopTimer();
        this.setFinalData();
      }
    });
  }

  private tickWorked() {
    let s = this.secondsWorked.getValue();
    let m = this.minutesWorked.getValue();
    let h = this.hoursWorked.getValue();

    s++;
    if (s > 59) {
      s = 0;
      m++;
      if (m > 59) {
        m = 0;
        h++;
      }
    }

    this.secondsWorked.next(s);
    this.minutesWorked.next(m);
    this.hoursWorked.next(h);
  }

  private tickRemaining() {
    let s = this.secondsRemained.getValue();
    let m = this.minutesRemained.getValue();
    let h = this.hoursRemained.getValue();

    if (s === 0) {
      s = 59;
      if (m === 0) {
        m = 59;
        h = Math.max(0, h - 1);
      } else {
        m--;
      }
    } else {
      s--;
    }

    this.secondsRemained.next(s);
    this.minutesRemained.next(m);
    this.hoursRemained.next(h);
  }

  private setFinalData() {
    const [hStart, mStart, sStart] = this.startTime.value
      .split(':')
      .map(Number);
    let s = this.secondsWorked.value + sStart;
    let m = this.minutesWorked.value + mStart + Math.floor(s / 60);
    s = s % 60;
    let h = this.hoursWorked.value + hStart + Math.floor(m / 60);
    m = m % 60;

    const stop = this.generateFormatTime(h, m, s);

    const data: RowDataSummary = {
      date: this.currentDate,
      type: 'Pontat',
      start: this.startTime.value,
      stop,
      duration: this.timeSpent.value,
    };

    this.dataOfDayWorked.next(data);
  }

  onStopTimer() {
    this.intervalSubscription?.unsubscribe();
    this.intervalSubscription = null;

    this.saveToStorage('time-left', this.timeLeft.value);
    this.saveToStorage('time-spent', this.timeSpent.value);
    this.saveToStorage('start-time', this.startTime.value);
  }

  onResetTimer() {
    this.hoursRemained.next(0);
    this.minutesRemained.next(0);
    this.secondsRemained.next(10);
    this.updateFormattedTime(
      this.hoursRemained,
      this.minutesRemained,
      this.secondsRemained,
      this.timeLeft
    );

    this.hoursWorked.next(0);
    this.minutesWorked.next(0);
    this.secondsWorked.next(0);
    this.updateFormattedTime(
      this.hoursWorked,
      this.minutesWorked,
      this.secondsWorked,
      this.timeSpent
    );

    this.startTime.next('--:--:--');
    this.isTimeOver.next(false);

    localStorage.removeItem('time-spent');
    localStorage.removeItem('time-left');
    localStorage.removeItem('start-time');
  }
}
