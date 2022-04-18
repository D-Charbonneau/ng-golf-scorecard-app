import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { DbData } from '../interfaces/db-data';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService
{
    private firebaseRef: AngularFirestoreDocument<DbData>;

    constructor(private db: AngularFirestore) 
    {
        this.firebaseRef = this.db.doc<DbData>('saved-course/nUJTlaYqx4WSDdQGFUrp');
    }

    setDbUrl(id: string)
    {
        this.firebaseRef = this.db.doc<DbData>('saved-course/' + id);
    }

    getSavedData(): Observable<DbData | undefined>
    {
        return this.firebaseRef.valueChanges();
    }

    savePlayerData(playerData: DbData)
    {
        this.firebaseRef.set(playerData);
    }
}
