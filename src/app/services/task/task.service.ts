import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getCountFromServer, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
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

  updateTaskStatus(task: any, status: boolean) {
    if (!status) {
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

  updateTask(task: any) {
    return updateDoc(doc(this.firestore, `task/${task.id}`), {
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      //taskCategory: this.selectedCategory.name,
      //catId: this.selectedCategory.id,
      taskModificationDate: new Date(),
      taskDueDate: task.taskDueDate
      //status: false,
    });
  }

  deleteTask(task: any) {
    return deleteDoc(doc(this.firestore, `task/${task.id}`));
  }

  getAllTaskByStatus(status: boolean, uid: any) {
    return collectionData(
      query(collection(this.firestore, 'task'),
        orderBy('taskModificationDate', 'desc'),
        where('status', '==', status),
        where('uid', '==', uid)), {
      idField: 'id'
    }) as Observable<any[]>;
  }

  getTaskByCategoryAndStatus(category: any, status: boolean, uid: any) {
    return collectionData(
      query(collection(this.firestore, 'task'),
        orderBy('taskModificationDate', 'desc'),
        where('catId', '==', category.id), //updated from taskCategory to catId
        where('status', '==', status),
        where('uid', '==', uid)), {
      idField: 'id'
    }) as Observable<any[]>;
  }

  getAllUnfinishedTasksCount(uid: any) {
    return getCountFromServer(
      query(collection(this.firestore, 'task'),
      where('status', '==', false),
      where('uid', '==', uid)));
  }

  /* sin id de usuario
  getUnfinishedTaskByCategoryCount(catId: any) {
    return getCountFromServer(
      query(collection(this.firestore, 'task'),
      where('status', '==', false),
      where('catId', '==', catId)));
  }
  */

  // deprecated

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

  getTaskByCategory(category: any, uid: any) {
    return collectionData(
      query(collection(this.firestore, 'task'),
        orderBy('taskModificationDate', 'desc'),
        where('taskCategory', '==', category),
        where('uid', '==', uid)), {
      idField: 'id'
    }) as Observable<any[]>
  }

}

