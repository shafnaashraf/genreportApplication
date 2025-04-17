import {Component} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-progress',
  templateUrl: 'progress.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  styleUrls: ['progress.component.css']
})
export class ProgressComponent{

}
