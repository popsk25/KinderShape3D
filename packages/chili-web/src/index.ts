// Copyright 2022-2023 the Chili authors. All rights reserved. AGPL-3.0 license.

import { AppBuilder } from "chili-builder";
import { Logger } from "chili-core";
import { I18nModule } from "./i18nModule";
import { Loading } from "./loading";

let loading = new Loading();
document.body.appendChild(loading);

// prettier-ignore
new AppBuilder()
    .useIndexedDB()
    .useWasmOcc()
    .useThree()
    .useUI()
    .addAdditionalModules(new I18nModule())
    .build()
    .then(x => {
        document.body.removeChild(loading)
    })
    .catch((err) => {
        Logger.error(err);
    });
