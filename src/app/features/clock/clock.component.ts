import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TimerService } from '../../core/services/timer.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [MatIconModule, CommonModule, ButtonComponent],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.sass',
})
export class ClockComponent {
  constructor(private timerService: TimerService) {
    this.timerService.init();
  }

  timeSpent$ = this.timerService.timeSpent$;
  timeLeft$ = this.timerService.timeLeft$;
  isTimeOver$ = this.timerService.isTimeOVer$;
  startTime$ = this.timerService.startTime$;

  _snackBar = inject(MatSnackBar);

  onStartTimer() {
    this.timerService.onStartTimer();
    this.isTimeOver$.subscribe((value) => {
      if (value) {
        this._snackBar.open('Timpul s-a terminat!', 'Inchide');
      }
    });
  }

  onStopTimer() {
    this.timerService.onStopTimer();
  }

  onResetTimer() {
    this.timerService.onResetTimer();
  }
}
