import { Routes } from '@angular/router';
import {JobComponent} from './header/job/job.component';
import {ProductionComponent} from './header/production/production.component';

export const routes: Routes = [
  { path: 'job', component: JobComponent },
  { path: 'production', component: ProductionComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full' }, // default route
  { path: '**', redirectTo: 'about' } // fallback route
];
