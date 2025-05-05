import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {jobService} from '../../../services/job.service';
import {SupportDetailService} from '../../../services/supportDetail.service';

interface ProgressRow {
  assemblyTagNo: string;
  drawingNo: string;
  title: string;
  weight: string;
  qty: number;
  cutting: string;
  fitup: string;
  welding: string;
  paintReleaseDate: string;
  blastPaint: string;
  remarks: string;
  editMode: boolean;
  isEdited?: boolean;
  jobNumber: string;
  subJobNumber: string;
}

@Component({
  selector: 'app-progress',
  templateUrl: 'progress.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['progress.component.css']
})
export class ProgressComponent{

  searchJobNumber: string = '';
  selectedSubJobNumbers: string[] = [];
  availableSubJobNumbers: string[] = [];
  showDropdown: boolean = false;
  rows: ProgressRow[] = [];
  filteredRows: ProgressRow[] = [];
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
        this.title = response.title;

      } catch (error) {
        console.error('Error fetching support details:', error);
        alert('Error submitting report. Please try again.');
      }
    }
  }

  async search() {
    // Mark that search has been performed
    this.searchPerformed = true;
    // Close dropdown
    this.showDropdown = false;
    if (this.searchJobNumber && this.selectedSubJobNumbers.length > 0) {
      // Call the service method
      this.filteredRows = [];
      try {
        const response = await firstValueFrom(
          this.supportService.searchSubJobDetailsForSubJobs(this.searchJobNumber , this.selectedSubJobNumbers)
        );

        console.log('fetched sub job details successfully:', response);

        response.forEach(drawing => {
          const drawingDetails : ProgressRow ={
            assemblyTagNo: drawing.assemblyTagNo,
            drawingNo: drawing.drawingNumber,
            title: '',
            weight: '',
            qty: drawing.qty,
            cutting: '',
            fitup: '',
            welding: '',
            paintReleaseDate: '',
            blastPaint: '',
            remarks: '',
            editMode: false,
            jobNumber: drawing.jobNumber,
            subJobNumber: drawing.subJobNumber
          }
          this.filteredRows.push(drawingDetails);
        })

        // Update search results flag
        this.hasSearchResults = this.filteredRows.length > 0;
        console.log('Search results:', this.filteredRows.length);

      } catch (error) {
        console.error('Error fetching support details:', error);
        alert('Error submitting report. Please try again.');
      }
    }

    // Filter rows based on search criteria
    // if (this.searchJobNumber && this.selectedSubJobNumbers.length > 0) {
    //   this.filteredRows = this.rows.filter(row =>
    //     row.jobNumber === this.searchJobNumber &&
    //     this.selectedSubJobNumbers.includes(row.reportNumber)
    //   );
    // } else if (this.searchJobNumber) {
    //   this.filteredRows = this.rows.filter(row =>
    //     row.jobNumber === this.searchJobNumber
    //   );
    // } else if (this.selectedSubJobNumbers.length > 0) {
    //   this.filteredRows = this.rows.filter(row =>
    //     this.selectedSubJobNumbers.includes(row.reportNumber)
    //   );
    // } else {
    //   // If no search criteria, show nothing
    //   this.filteredRows = [];
    // }

  }

  toggleEdit(row: ProgressRow): void {
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
