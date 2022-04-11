import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(
    private theme: ThemeService,
    private icon: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    const { isDark, themeClass } = this.theme.initTheme();
    this.isDark = isDark;
    this.themeClass = themeClass;

    this.loadIcons();
  }

  changeTheme() {
    const { isDark, themeClass } = this.theme.switchTheme();
    this.isDark = isDark;
    this.themeClass = themeClass;
  }

  loadIcons() {
    this.icon
      .setDefaultFontSetClass('icon-')
      .addSvgIcon(
        'pacman',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icomoon/SVG/1-pacman.svg'
        )
      );

    console.log(this.icon.getDefaultFontSetClass());
    this.icon.getNamedSvgIcon('pacman').subscribe(console.log);
  }
}
