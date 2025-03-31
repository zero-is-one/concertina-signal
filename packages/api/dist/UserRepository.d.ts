import { Auth } from "firebase/auth";
import { Firestore, Timestamp } from "firebase/firestore";
import { IUserRepository, User } from "./IUserRepository.js";
export declare const createUserRepository: (firestore: Firestore, auth: Auth) => IUserRepository;
export interface FirestoreUser {
    name: string;
    bio: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export declare const convertUser: (id: string, data: FirestoreUser) => User;
