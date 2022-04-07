import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { WindowToken } from './window';

type ThemeClassType = 'light-theme' | 'dark-theme';

export interface ThemeData {
  isDark: boolean;
  themeClass: ThemeClassType;
}

/* istanbul ignore next */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = false;
  themeClass: ThemeClassType = 'light-theme';
  private classList: ThemeClassType[] = ['light-theme', 'dark-theme'];
  private readonly key = 'is_dark_theme';

  constructor(
    private overlayContainer: OverlayContainer,
    @Inject(WindowToken) private window: Window,
    @Inject(DOCUMENT) private document: Document
  ) {}

  initTheme(): ThemeData {
    const theme = this.window.localStorage.getItem(this.key);
    const body = this.document.body;

    if (theme) {
      this.isDark = JSON.parse(theme) === true;
    } else {
      this.isDark = false;
    }

    this.themeClass = this.isDark ? this.classList[1] : this.classList[0];
    body.classList.add(this.themeClass);
    this.window.localStorage.setItem(this.key, String(this.isDark));
    return { isDark: this.isDark, themeClass: this.themeClass };
  }

  switchTheme(): ThemeData {
    this.isDark = !this.isDark;
    const body = this.document.body;

    if (this.isDark) {
      body.classList.replace('light-theme', 'dark-theme');
    } else {
      body.classList.replace('dark-theme', 'light-theme');
    }
    this.themeClass = this.isDark ? this.classList[1] : this.classList[0];
    this.window.localStorage.setItem(this.key, String(this.isDark));
    return { isDark: this.isDark, themeClass: this.themeClass };
  }
}
