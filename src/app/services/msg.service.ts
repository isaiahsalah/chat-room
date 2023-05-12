import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, orderBy, query, limit } from '@angular/fire/firestore';
import MyMsg from '../interfaces/myMsg.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(private firestore: Firestore) { }

  addMsg(msg: MyMsg) {
    const msgRef = collection(this.firestore, 'msg');
    return addDoc(msgRef, msg);
  }

  listMsg(): Observable<MyMsg[]> {
    const msgRef = query(collection(this.firestore, 'msg'), orderBy('createdAt'), limit(15));
    return collectionData(msgRef, { idField: 'id' }) as Observable<MyMsg[]>;
  }
}
