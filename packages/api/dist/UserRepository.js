import { deleteUser } from "firebase/auth";
import { Timestamp, collection, doc, getDoc, getDocs, onSnapshot, query, runTransaction, where, } from "firebase/firestore";
export const createUserRepository = (firestore, auth) => new UserRepository(firestore, auth);
class UserRepository {
    firestore;
    auth;
    constructor(firestore, auth) {
        this.firestore = firestore;
        this.auth = auth;
    }
    get userCollection() {
        return collection(this.firestore, "users").withConverter(userConverter);
    }
    get userRef() {
        if (this.auth.currentUser === null) {
            throw new Error("You must be logged in to get the current user");
        }
        return doc(this.userCollection, this.auth.currentUser.uid);
    }
    async create(data) {
        await runTransaction(this.firestore, async (transaction) => {
            transaction.set(this.userRef, {
                name: data.name,
                bio: data.bio,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });
        });
    }
    async update(data) {
        await runTransaction(this.firestore, async (transaction) => {
            transaction.update(this.userRef, {
                name: data.name,
                bio: data.bio,
                updatedAt: Timestamp.now(),
            });
        });
    }
    async delete() {
        if (this.auth.currentUser === null) {
            throw new Error("You must be logged in to delete the current user");
        }
        await runTransaction(this.firestore, async (transaction) => {
            transaction.delete(this.userRef);
        });
        deleteUser(this.auth.currentUser);
    }
    async getCurrentUser() {
        const userDoc = await getDoc(this.userRef);
        if (!userDoc.exists()) {
            return null;
        }
        return toUser(userDoc);
    }
    async get(id) {
        const userDoc = await getDoc(doc(this.userCollection, id));
        if (!userDoc.exists()) {
            return null;
        }
        return toUser(userDoc);
    }
    async getByUsername(username) {
        const q = query(this.userCollection, where("name", "==", username));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            return null;
        }
        const user = snapshot.docs[0];
        return toUser(user);
    }
    observeCurrentUser(callback) {
        try {
            return onSnapshot(this.userRef, (snapshot) => {
                snapshot.exists() ? callback(toUser(snapshot)) : callback(null);
            });
        }
        catch (e) {
            console.warn(e);
            return () => { };
        }
    }
    observeAuthUser(callback) {
        // If Firebase initialization fails, auth will be null, so use optional chaining to do nothing in that case.
        return this.auth?.onAuthStateChanged((user) => {
            callback(user);
        });
    }
}
export const convertUser = (id, data) => ({
    id: id,
    name: data.name,
    bio: data.bio,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
});
const toUser = (snapshot) => {
    const data = snapshot.data();
    return convertUser(snapshot.id, data);
};
const userConverter = {
    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return data;
    },
    toFirestore(user) {
        return user;
    },
};
//# sourceMappingURL=UserRepository.js.map