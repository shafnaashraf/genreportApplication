import { Component } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {ProgressComponent} from './progress/progress.component';
import {SummaryComponent} from './summary/summary.component';

@Component({
  selector: 'production',
  templateUrl: 'production.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    ProgressComponent,
    SummaryComponent
  ],
  styleUrls: ['./production.component.css']
})
export class ProductionComponent {
  activeTab = 'progress';
}
