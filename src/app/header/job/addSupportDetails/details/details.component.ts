import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'details-supp',
  templateUrl: 'details.component.html',
  styleUrl: 'details.component.css',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class DetailsComponent{

  @Input()
  jobDetails!: { jobNumber: string; reportNumber: string; client : string ; project : string;title : string };

  onSubmit() {
    return 1;
  }
}
