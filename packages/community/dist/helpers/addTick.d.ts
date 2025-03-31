import { DistributiveOmit } from "@emotion/react";
export declare function addTick<T extends {
    deltaTime: number;
}>(events: T[]): (DistributiveOmit<T, "deltaTime"> & {
    tick: number;
})[];
