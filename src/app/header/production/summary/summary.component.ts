import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {jobService} from '../../../services/job.service';
import {SupportDetailService} from '../../../services/supportDetail.service';
import {SummaryVO} from '../../../models/SummaryVO';

@Component({
  selector: 'app-summary',
  templateUrl: 'summary.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    FormsModule,
    NgForOf
  ],
  styleUrls: ['summary.component.css']
})
export class SummaryComponent{
  searchJobNumber: string = '';
  selectedSubJobNumbers: string[] = [];
  availableSubJobNumbers: string[] = [];
  showDropdown: boolean = false;
  rows: SummaryVO[] = [];
  filteredRows: SummaryVO[] = [];
  searchPerformed: boolean = false;
  hasSearchResults: boolean = false;
  title : string ='';

  constructor(
    private supportService : SupportDetailService,
    private jobService : jobService// Replace with your actual service
  ) { }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  toggleReportSelection(report: string, event: any): void {
    if (event.target.checked) {
      this.selectedSubJobNumbers.push(report);
    } else {
      this.selectedSubJobNumbers = this.selectedSubJobNumbers.filter(r => r !== report);
    }
  }

  async searchSubJobs(){
    if (this.searchJobNumber) {
      // Call the service method
      this.availableSubJobNumbers = [];
      try {
        const response = await firstValueFrom(
          this.jobService.searchSubJobs(this.searchJobNumber)
        );

        console.log('fetched sub jobs successfully:', response);

        response.subJobDetails.forEach(subJob => {
          this.availableSubJobNumbers.push(subJob.subJobNumber);
        })
        // this.showReportDropdown = true;
        // this.client = response.clientName;
        // this.project = response.projectDesc;
         //this.title = response.title;

      } catch (error) {
        console.error('Error fetching support details:', error);
        alert('Error submitting report. Please try again.');
      }
    }
  }
  async search() {
    this.searchPerformed = true;
    this.showDropdown = false;

    if (this.searchJobNumber && this.selectedSubJobNumbers.length > 0) {
      // Call the service method
      this.filteredRows = [];
      try {
        const response = await firstValueFrom(
          this.supportService.getSummaryDetailsBySubJobs(this.searchJobNumber , this.selectedSubJobNumbers)
        );

        console.log('fetched sub job details successfully:', response);

        response.forEach(drawing => {
          const drawingDetails : SummaryVO ={
            title: drawing.title,
            totalQty: drawing.totalQty,
            UOM: '',
            cutting: drawing.cutting,
            fitup: drawing.fitup,
            welding: drawing.welding,
            blastPaint: drawing.blastPaint ? drawing.blastPaint :0.0,
            compPercent:(drawing.welding + (drawing.blastPaint? drawing.blastPaint :0.0))/2,
            remarks: '',
            editMode: false,
            jobNumber: drawing.jobNumber ,
            subJobNumber: drawing.subJobNumber
          }

          this.filteredRows.push(drawingDetails);
        })
        this.hasSearchResults = this.filteredRows.length > 0;
        console.log('Search results:', this.filteredRows.length);

      } catch (error) {
        console.error('Error fetching support details:', error);
        alert('Error submitting report. Please try again.');
      }
    }

  }

  toggleEdit(row: SummaryVO): void {
    if (row.editMode) {
      // Save changes
      row.editMode = false;
      row.isEdited = true;

      // Reset the highlight effect after 2 seconds
      setTimeout(() => {
        row.isEdited = false;
      }, 2000);

      console.log('Saved row:', row);
    } else {
      // Enter edit mode
      row.editMode = true;
    }
  }

  importData(): void {
    console.log('Import functionality');
    // Implement import logic
  }

  exportData(): void {
    console.log('Export functionality');
    // Implement export logic
  }
}
