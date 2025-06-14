// Copyright 2022-2023 the Chili authors. All rights reserved. AGPL-3.0 license.

import { AdditionalCommand, IAdditionalModule } from "chili-builder";
import { Locale } from "chili-core";
import en from "../../chili-core/src/i18n/en";
import ru from "../../chili-core/src/i18n/ru-RU";

export class I18nModule implements IAdditionalModule {
    i18n(): Locale[] {
        return [
            en as Locale,
            ru as Locale
        ];
    }

    ribbonCommands(): AdditionalCommand[] {
        return [];
    }
} 