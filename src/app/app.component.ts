import { Component, ChangeDetectorRef } from "@angular/core";
import { IconService } from "./icon.service";
import { ThemeService } from "./theme.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "demo";
    isDark;
    themeClass;

    constructor(
        private theme: ThemeService,
        private iconService: IconService,
        private cdr: ChangeDetectorRef
    ) {
        const { isDark, themeClass } = this.theme;
        this.isDark = isDark;
        this.themeClass = themeClass;

        this.iconService.init();
    }

    changeTheme() {
        const { isDark, themeClass } = this.theme.switchTheme();
        this.isDark = isDark;
        this.themeClass = themeClass;
        this.cdr.markForCheck();
    }
}
