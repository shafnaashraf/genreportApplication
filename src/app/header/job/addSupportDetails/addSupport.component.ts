import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {DetailsComponent} from './details/details.component';

@Component({
  selector: 'add-support',
  templateUrl: 'addSupport.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    DetailsComponent
  ],
  styleUrl: 'addSupport.component.css'
})
export class AddSupportComponent{

  jobNumber: string = '';
  reportNumbers: string[] = [];
  selectedReport: string = '';
  showReportDropdown = false;
  showAddReportForm = false;
  jobDetails: { jobNumber: string; reportNumber: string ;client : string ; project:string;title:string} = {
    jobNumber: '',
    reportNumber: '',
    client:'ADNOC OFFSHORE',
    project:'DAS ISLAND SECTIONAL REPLACEMENT',
    title:'PIPE SHORE REPORT'
  };

  searchJob() {
    // Example logic — replace with actual search implementation
    if (this.jobNumber.trim()) {
      this.reportNumbers = ['RPT-101', 'RPT-102', 'RPT-103']; // Example data
      this.showReportDropdown = true;
      this.jobDetails.jobNumber = this.jobNumber;
    }
  }

  addReportDetails() {
    this.jobDetails.reportNumber = this.selectedReport;
    this.showAddReportForm = true;
    console.log('Selected Report:', this.selectedReport);
    // You can navigate, open a modal, or show another section here
  }
}
