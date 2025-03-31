import { makeObservable, observable } from "mobx";
export class CommunitySongStore {
    songs = [];
    constructor() {
        makeObservable(this, {
            songs: observable,
        });
    }
}
//# sourceMappingURL=CommunitySongStore.js.map