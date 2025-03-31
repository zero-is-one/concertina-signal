import { Auth } from "firebase/auth";
import { DocumentReference, Firestore, Timestamp } from "firebase/firestore";
import { ICloudSongRepository } from "./ICloudSongRepository.js";
import { FirestoreUser } from "./UserRepository.js";
export declare const createCloudSongRepository: (firestore: Firestore, auth: Auth) => ICloudSongRepository;
interface FirestoreSong {
    name: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    publishedAt?: Timestamp;
    dataRef: DocumentReference;
    userId: string;
    playCount?: number;
    user?: FirestoreUser;
}
export declare const songCollection: (firestore: Firestore) => import("@firebase/firestore").CollectionReference<FirestoreSong, import("@firebase/firestore").DocumentData>;
export {};
