import { Timestamp } from "@angular/fire/firestore";

export default interface MyMsg {
    id?: string;
    text: string;
    createdAt: Timestamp;
    uid: string;
    photoURL: string,
    name: string
}