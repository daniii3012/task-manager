import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

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
import { TaskCategoryListComponent } from './components/task/task-category-list/task-category-list.component';
import { TaskCategorySelectionComponent } from './components/task/task-category-selection/task-category-selection.component';
import { TaskItemTemplateComponent } from './components/task/task-item/task-item-template/task-item-template.component';
import { TaskAddComponent } from './components/task/task-add/task-add.component';

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
    TaskCategoryListComponent,
    TaskCategorySelectionComponent,
    TaskItemTemplateComponent,
    TaskAddComponent
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
