import { Component } from '@angular/core';
import { ClockComponent } from '../clock/clock.component';
import { TimeTableComponent } from '../time-table/time-table.component';

@Component({
  selector: 'app-clocking',
  standalone: true,
  imports: [ClockComponent, TimeTableComponent],
  templateUrl: './clocking.component.html',
  styleUrl: './clocking.component.sass',
})
export class ClockingComponent {}
