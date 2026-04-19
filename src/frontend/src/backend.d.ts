import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PhotoMeta {
    id: PhotoId;
    url: string;
    caption: string;
    dateTaken: string;
}
export type PhotoId = bigint;
export interface backendInterface {
    checkPassword(password: string): Promise<boolean>;
    getAnniversaryTimestamp(): Promise<bigint>;
    getDailyMessage(): Promise<string>;
    getPhotos(): Promise<Array<PhotoMeta>>;
}
