import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { BusinessComponent } from './business/business.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BusinessNewComponent } from './business-new/business-new.component';
import { CustomAccControlComponent } from './custom-acc/custom-acc-control/custom-acc-control.component';
import { CustomAccComponent } from './custom-acc/custom-acc/custom-acc.component';
import { BusinessDataBasicComponent } from './business-data-basic/business-data-basic.component';
import { BusinessDataAccountsComponent } from './business-data-accounts/business-data-accounts.component';
import { BusinessDataStorageComponent } from './business-data-storage/business-data-storage.component';
import { OrderersComponent } from './orderers/orderers.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ChecksComponent } from './checks/checks.component';
import { ReportsComponent } from './reports/reports.component';
import { OrderersAddComponent } from './orderers-add/orderers-add.component';
import { DialogComponent } from './dialog/dialog.component';
import { FacilitiesAddComponent } from './facilities-add/facilities-add.component';
import { FacilitiesEditComponent } from './facilities-edit/facilities-edit.component';
import { TablesComponent } from './tables/tables.component';
// import { ExampleTelInputComponent } from './ang-custom/example-tel-input/example-tel-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    BusinessComponent,
    HeaderComponent,
    BusinessNewComponent,
    CustomAccControlComponent,
    CustomAccComponent,
    BusinessDataBasicComponent,
    BusinessDataAccountsComponent,
    BusinessDataStorageComponent,
    OrderersComponent,
    FacilitiesComponent,
    InventoryComponent,
    ChecksComponent,
    ReportsComponent,
    OrderersAddComponent,
    DialogComponent,
    FacilitiesAddComponent,
    FacilitiesEditComponent,
    TablesComponent
    // ExampleTelInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
