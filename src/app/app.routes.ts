import { Routes } from '@angular/router';
import {JobComponent} from './header/job/job.component';

export const routes: Routes = [
  { path: 'job', component: JobComponent },
  { path: '', redirectTo: 'about', pathMatch: 'full' }, // default route
  { path: '**', redirectTo: 'about' } // fallback route
];
