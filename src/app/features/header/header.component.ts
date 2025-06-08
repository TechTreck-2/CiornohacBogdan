import { Component } from '@angular/core';
import { ThemeComponent } from '../../shared/components/theme/theme.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {}
