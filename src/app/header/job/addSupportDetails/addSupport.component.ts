import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {jobService} from '../../../services/job.service';
import {SupportDetail} from '../../../models/SupportDetail';
import {SupportDetailService} from '../../../services/supportDetail.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'add-support',
  templateUrl: 'addSupport.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrl: 'addSupport.component.css'
})
export class AddSupportComponent{

  // Search form properties
  jobNumber: string = '';
  client: string ='';
  project: string ='';
  title: string = '';
  subJobNumbers: string[] = [];
  selectedSubJob: string = '';
  showReportDropdown: boolean = false;
  showDetailsSection: boolean = false;

  constructor(
    private supportDetailService: SupportDetailService,
    private jobService : jobService// Replace with your actual service
  ) { }

  // Job details
  jobDetails: {
    jobNumber: string;
    subJobNumber: string;
    client: string;
    project: string;
    title: string
  } = {
    jobNumber: '',
    subJobNumber: '',
    client: '',
    project: '',
    title: ''
  };

  // Support table properties
  newSupport: SupportDetail = {
    jobNumber: '',
    subJobNumber: '',
    drawingNumber: '',
    assemblyTagNo: '',
    qty: 0,
    itemNo: '',
    itemDesc: '',
    specifGrade: ''
  };

  supportList: SupportDetail[] = [];
  editingSupport: SupportDetail | null = null;
  editingIndex: number = -1;

  async searchJob() {
    if (this.jobNumber) {
      // Call the service method
      this.subJobNumbers = [];

      try {
        const response = await firstValueFrom(
          this.jobService.searchSubJobs(this.jobNumber)
        );

        console.log('fetched sub jobs successfully:', response);

        response.subJobDetails.forEach(subJob => {
          this.subJobNumbers.push(subJob.subJobNumber);
        })
        this.showReportDropdown = true;
        this.client = response.clientName;
        this.project = response.projectDesc;
        this.title = response.title;

      } catch (error) {
        console.error('Error fetching support details:', error);
        alert('Error submitting report. Please try again.');
      }
    }
  }

  // Load report details
  async loadReportDetails() {
    if (this.selectedSubJob) {
      try {
        const response = await firstValueFrom(
          this.supportDetailService.searchSubJobDetails(this.jobNumber, this.selectedSubJob)
        );

        console.log('fetched support details successfully:', response);

        this.jobDetails = {
          jobNumber: this.jobNumber,
          subJobNumber: this.selectedSubJob,
          client: this.client,
          project: this.project,
          title: this.title
        };

        this.supportList = [];
        response.forEach(support => {
          this.supportList.push(support);
        });

        this.showDetailsSection = true;
      } catch (error) {
        console.error('Error fetching support details:', error);
        alert('Error submitting report. Please try again.');
      }
    }
  }

  // Toggle search section visibility
  toggleSearchSection() {
    if (this.showDetailsSection) {
      this.showDetailsSection = false;
    }
  }

  // Go back to search
  backToSearch() {
    this.showDetailsSection = false;
  }

  // Support table functions
  async saveSupport() {
    if (this.newSupport.drawingNumber !== '') {
      this.newSupport.jobNumber = this.jobNumber;
      this.newSupport.subJobNumber = this.selectedSubJob;

      try {
        const response = await firstValueFrom(
          this.supportDetailService.addSupportDetails(this.newSupport)
        );

        console.log('Support created successfully:', response);

        this.supportList.push({ ...this.newSupport });
        this.newSupport = {
          jobNumber: '',
          subJobNumber: '',
          drawingNumber: '',
          assemblyTagNo: '',
          qty: 0,
          itemNo: '',
          itemDesc: '',
          specifGrade: ''
        };
      } catch (error) {
        console.error('Error adding support details:', error);
        alert('Error adding support details. Please try again.');
      }
    }
  }

  isFieldInvalid(value: string): boolean {
    return value === '';
  }

  editSupport(support: SupportDetail, index: number) {
    // Create a clone of the support to edit
    this.editingSupport = { ...support };
    this.editingIndex = index;
  }

  async saveEditedSupport() {
    if (this.editingSupport && this.editingIndex >= 0) {
      this.editingSupport.jobNumber = this.jobNumber;
      this.editingSupport.subJobNumber = this.selectedSubJob;

      try {
        const response = await firstValueFrom(
          this.supportDetailService.updateSupportDetails(this.editingSupport)
        );

        console.log('Support edited successfully:', response);
        this.supportList[this.editingIndex] = { ...this.editingSupport };
        this.cancelEdit();

      } catch (error) {
        console.error('Error editing support details:', error);
        alert('Error editing support details. Please try again.');
      }
    }
  }

  cancelEdit() {
    this.editingSupport = null;
    this.editingIndex = -1;
  }
}
