import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { themeConfig } from "./config/theme.config";

import { WindowToken } from "./window";

type ThemeClassType = "light-theme" | "dark-theme";

export interface ThemeData {
    isDark: boolean;
    themeClass: ThemeClassType;
}

declare const tinycolor: any;

export interface Color {
    name: string;
    hex: string;
    darkContrast: boolean;
}

@Injectable({
    providedIn: "root",
})
export class ThemeService {
    isDark = false;
    themeClass: ThemeClassType = "light-theme";
    rootStyle: any;

    primaryColor = "#000";
    primaryColorPalette: Color[] = [];

    private classList: ThemeClassType[] = ["light-theme", "dark-theme"];
    private readonly key = "is_dark_theme";

    constructor(
        @Inject(WindowToken) private window: Window,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.rootStyle = this.document.documentElement;
    }

    initTheme(): ThemeData {
        const theme = this.window.localStorage.getItem(this.key);
        const body = this.document.body;

        Object.entries(themeConfig).forEach(([k, v]) => {
            this.generateThemeByColor(v);
        });

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
            body.classList.replace("light-theme", "dark-theme");
        } else {
            body.classList.replace("dark-theme", "light-theme");
        }
        this.themeClass = this.isDark ? this.classList[1] : this.classList[0];
        this.window.localStorage.setItem(this.key, String(this.isDark));
        return { isDark: this.isDark, themeClass: this.themeClass };
    }

    generateThemeByColor(color: string) {
        const colorPalette = this.computeColors(color);

        for (const color of colorPalette) {
            const key1 = `--c-color-${color.name}`;
            const value1 = color.hex;
            this.rootStyle.style.setProperty(key1, value1);

            // const key2 = `--c-color-contrast-${color.name}`;
            // const value2 = color.darkContrast ? "rgba(black, 0.87)" : "white";
            // this.rootStyle.style.setProperty(key2, value2);
        }
    }

    computeColors(hex: string): Color[] {
        return [
            this.getColorObject(tinycolor(hex).lighten(52), "50"),
            this.getColorObject(tinycolor(hex).lighten(37), "100"),
            this.getColorObject(tinycolor(hex).lighten(26), "200"),
            this.getColorObject(tinycolor(hex).lighten(12), "300"),
            this.getColorObject(tinycolor(hex).lighten(6), "400"),
            this.getColorObject(tinycolor(hex), "500"),
            this.getColorObject(tinycolor(hex).darken(6), "600"),
            this.getColorObject(tinycolor(hex).darken(12), "700"),
            this.getColorObject(tinycolor(hex).darken(18), "800"),
            this.getColorObject(tinycolor(hex).darken(24), "900"),
            this.getColorObject(
                tinycolor(hex).lighten(50).saturate(30),
                "A100"
            ),
            this.getColorObject(
                tinycolor(hex).lighten(30).saturate(30),
                "A200"
            ),
            this.getColorObject(
                tinycolor(hex).lighten(10).saturate(15),
                "A400"
            ),
            this.getColorObject(tinycolor(hex).lighten(5).saturate(5), "A700"),
        ];
    }

    getColorObject(value: any, name: any): Color {
        const c = tinycolor(value);
        return {
            name: name,
            hex: c.toHexString(),
            darkContrast: c.isLight(),
        };
    }
}
