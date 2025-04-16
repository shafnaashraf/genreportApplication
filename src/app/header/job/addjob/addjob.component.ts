import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterOutlet} from '@angular/router';

@Component({
  selector : 'add-job',
  templateUrl : 'addjob.component.html',
  styleUrl : 'addjob.component.css',
  standalone : true,
  imports: [RouterOutlet, FormsModule]
})
export class AddjobComponent{
  onSubmit() {
    alert('Report submitted!');
  }

  name:string ="shafna";
}
