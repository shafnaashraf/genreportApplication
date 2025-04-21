import { Routes } from '@angular/router';
import {JobComponent} from './header/job/job.component';
import {ProductionComponent} from './header/production/production.component';
import {MaterialComponent} from './header/material/material.component';
import {LoginComponent} from './login/login.component';
import {ReportsComponent} from './header/reports/reports.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'job', component: JobComponent },
  { path: 'production', component: ProductionComponent },
  { path: 'material', component: MaterialComponent },
  { path: 'report', component: ReportsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
