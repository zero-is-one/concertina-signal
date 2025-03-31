import localization from "./localization.js";
export declare const LocalizationContext: import("react").Context<{
    language: "fr" | "en" | "ja" | "zh-Hans" | "zh-Hant" | null;
}>, useLocalization: () => Record<"bio" | "profile" | "edit-profile" | "signin-to-edit-profile" | "sign-in" | "sign-out" | "success-sign-in" | "display-name" | "tracks" | "recent-tracks" | "play-count" | "play-count-1" | "song-not-found" | "download" | "share" | "save" | "close" | "cut" | "copy" | "copied" | "created-at" | "published-at" | "updated-at" | "user-not-found" | "create-new" | "untitled-song", string>, useCurrentLanguage: () => "fr" | "en" | "ja" | "zh-Hans" | "zh-Hant", Localized: import("react").FC<{
    name: "bio" | "profile" | "edit-profile" | "signin-to-edit-profile" | "sign-in" | "sign-out" | "success-sign-in" | "display-name" | "tracks" | "recent-tracks" | "play-count" | "play-count-1" | "song-not-found" | "download" | "share" | "save" | "close" | "cut" | "copy" | "copied" | "created-at" | "published-at" | "updated-at" | "user-not-found" | "create-new" | "untitled-song";
}>;
export type Language = keyof typeof localization;
export type LocalizationKey = keyof (typeof localization)[Language];
