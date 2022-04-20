import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import svgIcons from './icons';

@Injectable()
export class IconService {
  constructor(
    private icon: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  init() {
    // when do not use svgIcon: <mat-icon>pacman</mat-icon>
    // this.icon.setDefaultFontSetClass('icon-');

    for (let i in svgIcons) {
      const svg = svgIcons[i as keyof object];

      this.icon.addSvgIconLiteral(
        i,
        this.domSanitizer.bypassSecurityTrustHtml(svg)
      );
    }
  }
}
