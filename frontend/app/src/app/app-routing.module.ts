import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BusinessNewComponent } from './business-new/business-new.component';
import { BusinessComponent } from './business/business.component';
import { CustomAccControlComponent } from './custom-acc/custom-acc-control/custom-acc-control.component';
import { CustomAccComponent } from './custom-acc/custom-acc/custom-acc.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'user', component: UserComponent},
  {path: 'business', component: BusinessComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'loginScreen', component: LoginComponent},
  {path: 'businessNew', component: BusinessNewComponent},
  {path: 'test', component: CustomAccControlComponent},
  {path: 'test2', component: CustomAccComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
