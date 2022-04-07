import { Component } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo';
  isDark;
  themeClass;

  constructor(private theme: ThemeService) {
    const { isDark, themeClass } = this.theme.initTheme();
    this.isDark = isDark;
    this.themeClass = themeClass;
  }

  changeTheme() {
    const { isDark, themeClass } = this.theme.switchTheme();
    this.isDark = isDark;
    this.themeClass = themeClass;
  }
}
