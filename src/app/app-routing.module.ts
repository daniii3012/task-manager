import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import { authGuard } from './guards/auth/auth.guard';
import { TaskListUserComponent } from './components/task/task-list-user/task-list-user.component';
import { TaskListFinishedComponent } from './components/task/task-list-finished/task-list-finished.component';
import { TaskListUnfinishedComponent } from './components/task/task-list-unfinished/task-list-unfinished.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskManagerComponent, canActivate: [authGuard] },
  { path: 'tasks/all', component: TaskListUserComponent, canActivate: [authGuard] },
  { path: 'tasks/finished', component: TaskListFinishedComponent, canActivate: [authGuard] },
  { path: 'tasks/unfinished', component: TaskListUnfinishedComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
