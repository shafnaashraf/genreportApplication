import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {JobComponent} from './job/job.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'header.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    JobComponent,
    RouterOutlet
  ],
  styleUrls: ['header.component.css']
})
export class HeaderComponent{

}
