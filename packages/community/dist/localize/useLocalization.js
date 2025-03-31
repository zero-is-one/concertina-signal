import { createLocalization } from "use-l10n";
import localization from "./localization.js";
export const { LocalizationContext, useLocalization, useCurrentLanguage, Localized, } = createLocalization(localization, "en", [
    [/^fr/, "fr"],
    [/^zh-Hans/, "zh-Hans"],
    [/^zh-Hant/, "zh-Hant"],
    [/^zh$/, "zh-Hans"],
    [/^zh-TW$/, "zh-Hant"],
    [/^zh-HK$/, "zh-Hant"],
    [/^zh-MO$/, "zh-Hant"],
    [/^zh-CN$/, "zh-Hans"],
    [/^zh-SG$/, "zh-Hans"],
]);
//# sourceMappingURL=useLocalization.js.map