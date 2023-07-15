import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: Firestore) { 
    
  }

  addTask(task: any) {
    return addDoc(collection(this.firestore, 'task'), task);
  }

  updateTask(task: any, status: boolean) {
    if(!status) {
      return updateDoc(doc(this.firestore, `task/${task.id}`), {
        taskModificationDate: new Date(),
        status: status
      });
    } else {
      return updateDoc(doc(this.firestore, `task/${task.id}`), {
        status: status
      });
    }
    
  }

  deleteTask(task: any) {
    return deleteDoc(doc(this.firestore, `task/${task.id}`));
  }

  getTaskByUser(uid: any) {
    return collectionData(
      query(collection(this.firestore, 'task'),
        orderBy('taskModificationDate', 'desc'),
        where('uid', '==', uid)), {
      idField: 'id'
    }) as Observable<any[]>
  }

  getTaskByStatus(status: boolean, uid: any) {
    return collectionData(
      query(collection(this.firestore, 'task'),
        orderBy('taskModificationDate', 'desc'),
        where('status', '==', status),
        where('uid', '==', uid)), {
      idField: 'id'
    }) as Observable<any[]>
  }

}

