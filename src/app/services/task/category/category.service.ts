import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query, updateDoc, where, increment } from '@angular/fire/firestore';
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

  updateTaskCount(catId: any, operation: any) {
    if (operation) {
      return updateDoc(doc(this.firestore, `category/${catId}`), {
        taskCount: increment(1)
      });
    } else {
      return updateDoc(doc(this.firestore, `category/${catId}`), {
        taskCount: increment(-1)
      });
    }
  }

  updateUnfinishedCount(catId: any, operation: any) {
    if (operation) {
      return updateDoc(doc(this.firestore, `category/${catId}`), {
        taskUnfinishedCount: increment(1)
      });
    } else {
      return updateDoc(doc(this.firestore, `category/${catId}`), {
        taskUnfinishedCount: increment(-1)
      });
    }
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
