import {
    APP_INITIALIZER,
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { windowProvider, WindowToken } from "./window";
import { IconService } from "./icon.service";
import { ThemeService } from "./theme.service";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatIconModule,
    ],
    providers: [
        IconService,
        {
            provide: APP_INITIALIZER,
            useFactory: (theme: ThemeService) => {
                console.log("APP_INITIALIZER");
                return () =>
                    new Promise<boolean>((resolve, reject) => {
                        theme.initTheme();
                        resolve(true);
                    });
            },
            deps: [ThemeService],
            multi: true,
        },
        {
            provide: WindowToken,
            useFactory: windowProvider,
        },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
