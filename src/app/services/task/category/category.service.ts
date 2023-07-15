import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: Firestore) { 
  }

  addTaskCategory(category: any) {
    return addDoc(collection(this.firestore, 'category'), category);
  }

  deleteTaskCategory(category: any) {
    return deleteDoc(doc(this.firestore, `category/${category.id}`));
  }

  getCategoriesByUser(uid: any) {
    return collectionData(
      query(collection(this.firestore, 'category'),
        orderBy('name', 'asc'),
        where('uid', '==', uid)), {
      idField: 'id'
    }) as Observable<any[]>
  }

}
