import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AddjobComponent} from './addjob/addjob.component';
import {NgIf} from '@angular/common';
import {AddSupportComponent} from './addSupportDetails/addSupport.component';

@Component({
  selector: 'job',
  imports: [RouterOutlet, AddjobComponent, NgIf, AddSupportComponent, AddSupportComponent],
  templateUrl: './job.component.html',
  standalone: true,
  styleUrl: './job.component.css'
})
export class JobComponent{

  activeComponent: string = ''; // None shown initially

  showComponent(component: string) {
    this.activeComponent = component;
  }
}
