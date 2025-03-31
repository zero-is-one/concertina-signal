import { Bytes, collection, doc, getDoc, runTransaction, serverTimestamp, } from "firebase/firestore";
export const createCloudSongDataRepository = (firestore, auth) => new CloudSongDataRepository(firestore, auth);
export class CloudSongDataRepository {
    firestore;
    auth;
    constructor(firestore, auth) {
        this.firestore = firestore;
        this.auth = auth;
    }
    get songDataCollection() {
        return songDataCollection(this.firestore);
    }
    songDataRef(id) {
        return doc(this.songDataCollection, id);
    }
    async create(data) {
        if (this.auth.currentUser === null) {
            throw new Error("You must be logged in to save songs to the cloud");
        }
        const userId = this.auth.currentUser.uid;
        const dataDoc = doc(this.songDataCollection);
        await runTransaction(this.firestore, async (transaction) => {
            transaction.set(dataDoc, {
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                data: Bytes.fromUint8Array(data.data),
                userId,
            });
        });
        return dataDoc.id;
    }
    async get(id) {
        const ref = this.songDataRef(id);
        const snapshot = await getDoc(ref);
        const data = snapshot.data()?.data;
        if (data === undefined) {
            throw new Error("Song data does not exist");
        }
        return data.toUint8Array();
    }
    async update(id, data) {
        const ref = this.songDataRef(id);
        await runTransaction(this.firestore, async (transaction) => {
            transaction.update(ref, {
                updatedAt: serverTimestamp(),
                data: Bytes.fromUint8Array(data.data),
            });
        });
    }
    async publish(id) {
        const ref = this.songDataRef(id);
        await runTransaction(this.firestore, async (transaction) => {
            transaction.update(ref, {
                isPublic: true,
            });
        });
    }
    async unpublish(id) {
        const ref = this.songDataRef(id);
        await runTransaction(this.firestore, async (transaction) => {
            transaction.update(ref, {
                isPublic: false,
            });
        });
    }
    async delete(id) {
        await runTransaction(this.firestore, async (transaction) => {
            transaction.delete(this.songDataRef(id));
        });
    }
}
const songDataConverter = {
    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return data;
    },
    toFirestore(song) {
        return song;
    },
};
export const songDataCollection = (firestore) => collection(firestore, "songData").withConverter(songDataConverter);
//# sourceMappingURL=CloudSongDataRepository.js.map