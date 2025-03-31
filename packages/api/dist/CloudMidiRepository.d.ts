import { Firestore } from "firebase/firestore";
import { Functions } from "firebase/functions";
import { ICloudMidiRepository } from "./ICloudMidiRepository.js";
export declare const createCloudMidiRepository: (firestore: Firestore, functions: Functions) => ICloudMidiRepository;
