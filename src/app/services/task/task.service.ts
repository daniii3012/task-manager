import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: Firestore) { }

  addTask(task: any) {
    const taskRef = collection(this.firestore, 'task');
    return addDoc(taskRef, task);
  }

}
