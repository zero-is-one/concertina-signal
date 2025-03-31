import { Auth } from "firebase/auth";
import { Bytes, Firestore, Timestamp } from "firebase/firestore";
import { CloudSongData, ICloudSongDataRepository } from "./ICloudSongDataRepository.js";
export declare const createCloudSongDataRepository: (firestore: Firestore, auth: Auth) => ICloudSongDataRepository;
export declare class CloudSongDataRepository implements ICloudSongDataRepository {
    private readonly firestore;
    private readonly auth;
    constructor(firestore: Firestore, auth: Auth);
    private get songDataCollection();
    private songDataRef;
    create(data: Pick<CloudSongData, "data">): Promise<string>;
    get(id: string): Promise<Uint8Array>;
    update(id: string, data: Pick<CloudSongData, "data">): Promise<void>;
    publish(id: string): Promise<void>;
    unpublish(id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
interface FirestoreSongData {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    data?: Bytes;
    userId: string;
    isPublic?: boolean;
}
export declare const songDataCollection: (firestore: Firestore) => import("@firebase/firestore").CollectionReference<FirestoreSongData, import("@firebase/firestore").DocumentData>;
export {};
