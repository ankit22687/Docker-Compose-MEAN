import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { BaseModule } from '../base/base.module';

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    AccountRoutingModule
  ],
  declarations: [ProfileComponent, ChangePasswordComponent, ProfileDetailsComponent],
  exports: [ProfileComponent]
})
export class AccountModule { }
