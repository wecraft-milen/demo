import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Optional } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class CustomIconService extends MatIconRegistry {
  constructor(
    httpClient: HttpClient,
    sanitizer: DomSanitizer,
    @Optional() @Inject(DOCUMENT) document: Document,
    errorHandler: ErrorHandler
  ) {
    super(httpClient, sanitizer, document, errorHandler);
    // console.log(this);
  }

  // override getNamedSvgIcon(name: string, namespace?: string): Observable<any> {
  //   console.log(name);
  //   return of(name);
  // }

  // loadSvgIcon(name: string, namespace?: string): SVGElement | undefined | void {
  //   console.log(name);
  // }
}
