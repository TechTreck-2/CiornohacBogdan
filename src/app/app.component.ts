import { Component } from '@angular/core';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { TimetrackingTabComponent } from './features/timetracking-tab/timetracking-tab.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, TimetrackingTabComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  selectedTab: 'pontare' | 'sumar' = 'pontare';

  onTabChange(type: 'pontare' | 'sumar') {
    this.selectedTab = type;
  }
}
