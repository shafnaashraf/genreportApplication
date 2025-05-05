import {Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {jobService} from '../../../services/job.service';
import {JobDetailsVO} from '../../../models/JobDetailsVO';
import {SubJobDetailsVO} from '../../../models/SubJobDetailsVO';

@Component({
  selector : 'add-job',
  templateUrl : 'addjob.component.html',
  styleUrl : 'addjob.component.css',
  standalone : true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule]
})
export class AddjobComponent{

  jobNumber!: string;
  clientName!: string;
  projectDesc!: string;
  title!: string;
  subJobNumber!: string;

  constructor(
    private yourService: jobService // Replace with your actual service
  ) { }

  onSubmit(): void {
    if (this.jobNumber == '') {
      alert('Please fill all required fields');
      return;
    }

    const subJobDetails: SubJobDetailsVO[] = [];

    const subJobDetail: SubJobDetailsVO = {
      subJobNumber: this.subJobNumber,
    };
    subJobDetails.push(subJobDetail);

    const jobDetails: JobDetailsVO = {
      jobNumber : this.jobNumber,
      clientName :this.clientName,
      projectDesc : this.projectDesc,
      title : this.title,
      subJobDetails : subJobDetails
    }
    // Create JobDetailsVO from form


    // Call the service method
    this.yourService.addJob(jobDetails).subscribe(
      (response) => {
        console.log('Job created successfully:', response);
        alert('Report submitted!');
        // Initialize with one empty sub-job after reset
      },
      (error) => {
        console.error('Error creating job:', error);
        alert('Error submitting report. Please try again.');
      }
    );
  }
}
