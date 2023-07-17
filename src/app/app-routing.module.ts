import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  //{ path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskManagerComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: '**', pathMatch: 'full', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
