import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import { LoginComponent } from './pages/login/login.component';
import { RecentTasksComponent } from './components/home/recent-tasks/recent-tasks.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { TaskItemComponent } from './components/task/task-item/task-item.component';
import { TaskFormComponent } from './components/task/task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { TaskListUserComponent } from './components/task/task-list-user/task-list-user.component';
import { TaskListFinishedComponent } from './components/task/task-list-finished/task-list-finished.component';
import { TaskListUnfinishedComponent } from './components/task/task-list-unfinished/task-list-unfinished.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TaskManagerComponent,
    LoginComponent,
    RecentTasksComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskFormComponent,
    TaskListUserComponent,
    TaskListFinishedComponent,
    TaskListUnfinishedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
