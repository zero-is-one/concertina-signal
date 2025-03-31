import { collection, doc, getDoc, } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
export const createCloudMidiRepository = (firestore, functions) => new CloudMidiRepository(firestore, functions);
class CloudMidiRepository {
    firestore;
    functions;
    constructor(firestore, functions) {
        this.firestore = firestore;
        this.functions = functions;
    }
    async get(id) {
        const midiCollection = collection(this.firestore, "midis");
        const snapshot = await getDoc(doc(midiCollection, id).withConverter(midiConverter));
        const data = snapshot.data()?.data;
        if (data === undefined) {
            throw new Error("Midi data does not exist");
        }
        return data.toUint8Array();
    }
    async storeMidiFile(midiFileUrl) {
        const storeMidiFile = httpsCallable(this.functions, "storeMidiFile");
        const res = await storeMidiFile({ midiFileUrl });
        return res.data.docId;
    }
}
const midiConverter = {
    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return data;
    },
    toFirestore(midi) {
        return midi;
    },
};
//# sourceMappingURL=CloudMidiRepository.js.map