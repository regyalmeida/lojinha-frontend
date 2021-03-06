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
import { RegisterUserComponent } from './login-screen/register-user/register-user.component';
import { HomeProductComponent } from './home-screen/product/home-product.component';
import { FaqComponent } from './faq/faq.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { OrderComponent } from './client-orders/order/order.component';

const appRoutes: Routes = [
  { path: '', component: HomeScreenComponent, },
  { path: 'login', component: LoginScreenComponent, canActivate: [] },
  { path: 'home', component: HomeScreenComponent, canActivate: [] },
  { path: 'novo/usuario', component: RegisterUserComponent, canActivate: [] },
  { path: 'gerenciar/usuarios', component: UsersScreenComponent, canActivate: [AppGuardGuard] },
  { path: 'gerenciar/produtos', component: ProdutsScreenComponent, canActivate: [] },
  { path: 'carrinho', component: ShoppingComponent, canActivate: []},
  { path: 'pedidos', component: ClientOrdersComponent, canActivate: [AppGuardGuard]}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    HomeScreenComponent,
    NavBarComponent,
    UsersScreenComponent,
    ProdutsScreenComponent,
    RegisterUserComponent,
    HomeProductComponent,
    FaqComponent,
    ShoppingComponent,
    AlertModalComponent,
    ClientOrdersComponent,
    OrderComponent,
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
