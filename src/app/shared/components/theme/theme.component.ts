import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.sass',
})
export class ThemeComponent {
  isDarkMode = 'light';

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isDarkMode = localStorage.getItem('theme')
        ? localStorage.getItem('theme')!
        : 'light';
      document.body.setAttribute('data-theme', this.isDarkMode!);
    }
  }

  onChangeTeme() {
    this.isDarkMode = this.isDarkMode === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.isDarkMode);
    document.body.setAttribute('data-theme', this.isDarkMode);
  }
}
