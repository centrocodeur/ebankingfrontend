import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './navbar/navbar';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts'
import {ReactiveFormsModule} from '@angular/forms';
import { NewCustomer } from './new-customer/new-customer';
import { CustomerAccounts } from './customer-accounts/customer-accounts';
import { Login } from './login/login';
import { AdminTemplate } from './admin-template/admin-template'
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {AppHttpInterceptor} from './interceptors/app-http-interceptor';
import {appHttpV2Interceptor} from './interceptors/app-http-v2-interceptor';
import { NotAuthorized } from './not-authorized/not-authorized';

@NgModule({
  declarations: [
    App,
    Navbar,
    Customers,
    Accounts,
    NewCustomer,
    CustomerAccounts,
    Login,
    AdminTemplate,
    NotAuthorized,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [

    provideBrowserGlobalErrorListeners(),

    provideHttpClient(
      withInterceptorsFromDi(),
    ),
      {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi:true},

  ],
  bootstrap: [App]
})
export class AppModule { }
