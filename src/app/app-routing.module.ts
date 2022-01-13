import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/profile/edit/edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewComponent } from './components/profile/view/view.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuardService]},
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuardService]},
  { path: 'profile/:profileId/view', component: ViewComponent , canActivate: [AuthGuardService]},
  { path: 'profile/:profileId/edit', component: EditComponent , canActivate: [AuthGuardService]},
  {path: '**' ,component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
