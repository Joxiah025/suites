import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
 import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DndModule} from 'ng2-dnd';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginService } from './login-service.service';
import { FlowserviceService } from './flowservice.service';


import { AuthguardGuard } from './authguard.guard';
import { NewComponent } from './new/new.component';
import { PreviewComponent } from './preview/preview.component';
import { ReportComponent } from './report/report.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    canActivate: [AuthguardGuard],
    component: DashboardComponent 
  },
   { 
    path: 'new', 
    canActivate: [AuthguardGuard],
    component: NewComponent 
  },
   { 
    path: 'preview', 
    canActivate: [AuthguardGuard],
    component: PreviewComponent 
  },
   { 
    path: 'report', 
    canActivate: [AuthguardGuard],
    component: ReportComponent 
  },
   { 
    path: 'header', 
    canActivate: [AuthguardGuard],
    component: HeaderComponent 
  }
  //{ path: 'dashboard/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NewComponent,
    PreviewComponent,
    ReportComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    DndModule.forRoot()
  ],
  providers: [LoginService, AuthguardGuard,FlowserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
