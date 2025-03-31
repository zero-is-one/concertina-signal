import { max } from "lodash";
export function getEndOfTrack(events) {
    return max(events.map((event) => event.tick)) ?? 0;
}
//# sourceMappingURL=Track.js.map