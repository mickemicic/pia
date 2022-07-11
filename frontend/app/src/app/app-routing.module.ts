import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BusinessDataAccountsComponent } from './business-data-accounts/business-data-accounts.component';
import { BusinessDataBasicComponent } from './business-data-basic/business-data-basic.component';
import { BusinessDataStorageComponent } from './business-data-storage/business-data-storage.component';
import { BusinessNewComponent } from './business-new/business-new.component';
import { BusinessComponent } from './business/business.component';
import { CustomAccControlComponent } from './custom-acc/custom-acc-control/custom-acc-control.component';
import { CustomAccComponent } from './custom-acc/custom-acc/custom-acc.component';
import { LoginComponent } from './login/login.component';
import { OrderersAddComponent } from './orderers-add/orderers-add.component';
import { OrderersComponent } from './orderers/orderers.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'user', component: UserComponent},
  {path: 'business', component: BusinessComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'loginScreen', component: LoginComponent},
  {path: 'businessNew', component: BusinessNewComponent},
  {path: 'dataBasic', component: BusinessDataBasicComponent},
  {path: 'dataAcc', component: BusinessDataAccountsComponent},
  {path: 'dataStorage', component: BusinessDataStorageComponent},
  {path: 'orderers', component: OrderersComponent},
  {path: 'orderersAdd', component: OrderersAddComponent},
  {path: 'test', component: CustomAccControlComponent},
  {path: 'test2', component: CustomAccComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
