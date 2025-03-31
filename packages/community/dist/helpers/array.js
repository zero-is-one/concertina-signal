export function isNotNull(a) {
    return a !== null;
}
export function isNotUndefined(a) {
    return a !== undefined;
}
export function isNotNullOrUndefined(a) {
    return a !== null && a !== undefined;
}
export const joinObjects = (list, separator) => {
    const result = [];
    for (let i = 0; i < list.length; i++) {
        result.push(list[i]);
        if (i < list.length - 1) {
            result.push(separator(list[i], list[i + 1]));
        }
    }
    return result;
};
export const closedRange = (start, end, step) => {
    const result = [];
    for (let i = start; i <= end; i += step) {
        result.push(i);
    }
    return result;
};
//# sourceMappingURL=array.js.map