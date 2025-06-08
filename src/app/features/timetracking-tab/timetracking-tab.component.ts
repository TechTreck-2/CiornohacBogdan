import { Component, Input } from '@angular/core';
import { ClockingComponent } from '../clocking/clocking.component';
import { SummaryTabComponent } from '../summary-tab/summary-tab.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-timetracking-tab',
  standalone: true,
  imports: [HeaderComponent, ClockingComponent, SummaryTabComponent],
  templateUrl: './timetracking-tab.component.html',
  styleUrl: './timetracking-tab.component.sass',
})
export class TimetrackingTabComponent {
  @Input({ required: true }) selectedTab!: 'pontare' | 'sumar';
}
