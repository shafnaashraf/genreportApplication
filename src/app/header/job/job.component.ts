import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AddjobComponent} from './addjob/addjob.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'job',
  imports: [RouterOutlet, AddjobComponent, NgIf],
  templateUrl: './job.component.html',
  standalone: true,
  styleUrl: './job.component.css'
})
export class JobComponent{
  showReportForm:boolean = false ;

  showForm() {
    this.showReportForm = true;
  }
}
