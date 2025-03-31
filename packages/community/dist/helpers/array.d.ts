export declare function isNotNull<T>(a: T | null): a is T;
export declare function isNotUndefined<T>(a: T | undefined): a is T;
export declare function isNotNullOrUndefined<T>(a: T | null): a is T;
export declare const joinObjects: <T extends {}>(list: T[], separator: (prev: T, next: T) => T) => T[];
export declare const closedRange: (start: number, end: number, step: number) => number[];
