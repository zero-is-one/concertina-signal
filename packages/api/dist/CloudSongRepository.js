import { collection, doc, getDoc, getDocs, increment, orderBy, query, runTransaction, serverTimestamp, where, } from "firebase/firestore";
import { songDataCollection } from "./CloudSongDataRepository.js";
import { convertUser } from "./UserRepository.js";
export const createCloudSongRepository = (firestore, auth) => new CloudSongRepository(firestore, auth);
class CloudSongRepository {
    firestore;
    auth;
    constructor(firestore, auth) {
        this.firestore = firestore;
        this.auth = auth;
    }
    get songCollection() {
        return songCollection(this.firestore);
    }
    songRef(id) {
        return doc(this.songCollection, id);
    }
    async get(id) {
        const doc = await getDoc(this.songRef(id));
        if (!doc.exists()) {
            return null;
        }
        return toSong(doc);
    }
    async create(data) {
        if (this.auth.currentUser === null) {
            throw new Error("You must be logged in to save songs to the cloud");
        }
        const userId = this.auth.currentUser.uid;
        const dataRef = doc(songDataCollection(this.firestore), data.songDataId);
        const ref = doc(this.songCollection);
        await runTransaction(this.firestore, async (transaction) => {
            transaction.set(ref, {
                name: data.name,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                dataRef,
                userId,
            });
        });
        return ref.id;
    }
    async update(songId, data) {
        const ref = this.songRef(songId);
        await runTransaction(this.firestore, async (transaction) => {
            transaction.update(ref, {
                updatedAt: serverTimestamp(),
                name: data.name,
            });
        });
    }
    async delete(songId) {
        await runTransaction(this.firestore, async (transaction) => {
            transaction.delete(this.songRef(songId));
        });
    }
    async publish(songId, user) {
        const ref = this.songRef(songId);
        await runTransaction(this.firestore, async (transaction) => {
            transaction.update(ref, {
                isPublic: true,
                publishedAt: serverTimestamp(),
                user,
            });
        });
    }
    async unpublish(songId) {
        const ref = this.songRef(songId);
        await runTransaction(this.firestore, async (transaction) => {
            transaction.update(ref, {
                isPublic: false,
                publishedAt: null,
            });
        });
    }
    async getMySongs() {
        if (this.auth.currentUser === null) {
            throw new Error("You must be logged in to get songs from the cloud");
        }
        const res = await getDocs(query(this.songCollection, where("userId", "==", this.auth.currentUser.uid), orderBy("updatedAt", "desc")));
        return res.docs.map(toSong);
    }
    async getPublicSongs() {
        // 'isPublic'がtrueで、'publishedAt'でソートされたクエリ
        const publicSongsQuery = query(this.songCollection, where("isPublic", "==", true), orderBy("publishedAt", "desc"));
        const docs = await getDocs(publicSongsQuery);
        return docs.docs.map(toSong);
    }
    async getPublicSongsByUser(userId) {
        const publicSongsQuery = query(this.songCollection, where("isPublic", "==", true), where("userId", "==", userId), orderBy("publishedAt", "desc"));
        const docs = await getDocs(publicSongsQuery);
        return docs.docs.map(toSong);
    }
    async incrementPlayCount(songId) {
        const ref = this.songRef(songId);
        await runTransaction(this.firestore, async (transaction) => {
            transaction.update(ref, {
                playCount: increment(1),
            });
        });
    }
}
const toSong = (doc) => {
    const data = doc.data();
    return {
        ...data,
        id: doc.id,
        songDataId: data.dataRef.id,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        publishedAt: data.publishedAt?.toDate(),
        user: data.user && convertUser(data.userId, data.user),
    };
};
const songConverter = {
    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return data;
    },
    toFirestore(song) {
        return song;
    },
};
export const songCollection = (firestore) => collection(firestore, "songs").withConverter(songConverter);
//# sourceMappingURL=CloudSongRepository.js.map