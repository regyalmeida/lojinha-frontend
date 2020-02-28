import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppGuardGuard } from '../app/route-guard/app-guard.guard';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginScreenComponent } from './login-screen/login-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UsersScreenComponent } from './users-screen/users-screen.component';
import { ProdutsScreenComponent } from './produts-screen/produts-screen.component';

const appRoutes: Routes = [
  { path: '', component: LoginScreenComponent, },
  { path: 'home', component: HomeScreenComponent, canActivate: [AppGuardGuard] },
  { path: 'usuarios', component: UsersScreenComponent, canActivate: [AppGuardGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    HomeScreenComponent,
    NavBarComponent,
    UsersScreenComponent,
    ProdutsScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
