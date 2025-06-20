// Copyright 2022-2023 the Chili authors. All rights reserved. AGPL-3.0 license.

import en from "./en";
import { I18nKeys } from "./keys";
import ru from "./ru-RU";

const I18nId = "chili18n";
const I18nArgs = new WeakMap<HTMLElement, any[]>();

export type LanguageCode = "en" | "ru-RU";

export type Locale = {
    display: string;
    code: LanguageCode;
    translation: {
        [key in I18nKeys]: string;
    } & {
        [key: string]: string;
    };
};

export type Translation = Record<I18nKeys, string>;

export namespace I18n {
    export const languages = new Map<LanguageCode, Locale>([
        ["en", en],
        ["ru-RU", ru],
    ]);

    let _currentLanguage: LanguageCode = "ru-RU";

    export function currentLanguage() {
        return _currentLanguage;
    }

    export function combineTranslation(language: LanguageCode, translations: Record<string, string>) {
        let local = languages.get(language);
        if (local) {
            local.translation = {
                ...local.translation,
                ...translations,
            };
        }
    }

    export function translate(key: I18nKeys, ...args: any[]) {
        let language = languages.get(_currentLanguage)!;
        let text = language.translation[key] ?? languages.get("en")!.translation[key];
        if (args.length > 0) {
            text = text.replace(/\{(\d+)\}/g, (_, index) => args[index]);
        }
        return text;
    }

    export function set(dom: HTMLElement, key: I18nKeys, ...args: any[]) {
        dom.textContent = translate(key, ...args);
        dom.dataset[I18nId] = key;
        if (args.length > 0) {
            I18nArgs.set(dom, args);
        }
    }

    export function changeLanguage(index: number) {
        if (index < 0 || index >= languages.size) return;

        let newLanguage = Array.from(languages.keys())[index];
        if (newLanguage === _currentLanguage) return;
        _currentLanguage = newLanguage;

        document.querySelectorAll(`[data-${I18nId}]`).forEach((e) => {
            let html = e as HTMLElement;
            let id = html?.dataset[I18nId] as I18nKeys;
            if (id === undefined) return;
            let args = I18nArgs.get(html) ?? [];
            html.textContent = translate(id, ...args);
        });
    }
}
