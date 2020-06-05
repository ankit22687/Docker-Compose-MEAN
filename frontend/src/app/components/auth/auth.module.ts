import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { BaseModule } from '../base/base.module';
import { LoginComponent } from './login/login.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent, PasswordResetRequestComponent, PasswordResetComponent]
})
export class AuthModule { }
