import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {jobService} from '../../../services/job.service';
import {SupportDetailService} from '../../../services/supportDetail.service';
import {ProgressVO} from '../../../models/ProgressVO';
import {ProgressService} from '../../../services/progress.service';


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
  rows: ProgressVO[] = [];
  filteredRows: ProgressVO[] = [];
  searchPerformed: boolean = false;
  hasSearchResults: boolean = false;
  title : string ='';
  wait : boolean = false;

  constructor(
    private supportService : SupportDetailService,
    private jobService : jobService,
    private progressSerivce : ProgressService
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
    this.wait = true;
    // Close dropdown
    this.showDropdown = false;
    if (this.searchJobNumber && this.selectedSubJobNumbers.length > 0) {
      // Call the service method
      this.filteredRows = [];
      try {
        const response = await firstValueFrom(
          this.progressSerivce.fetchProgressDetails(this.searchJobNumber , this.selectedSubJobNumbers)
        );
        this.wait = false;
        console.log('fetched sub job details successfully:', response);

        response.forEach(drawing => {
          const drawingDetails : ProgressVO = {
            drawingNo : drawing.drawingNo,
            assemblyTagNo : drawing.assemblyTagNo,
            weight : drawing.weight !=undefined ? drawing.weight :undefined,
            qty: drawing.qty,
            cutting:  drawing.cutting !=undefined ? drawing.cutting :undefined,
            fitup:  drawing.fitup !=undefined ? drawing.fitup :undefined,
            welding:  drawing.welding !=undefined ? drawing.welding :undefined,
            paintRelDate: drawing.paintRelDate !=undefined ? drawing.paintRelDate :undefined,
            blastNPaint: drawing.blastNPaint !=undefined ? drawing.blastNPaint :undefined,
            remarks: drawing.remarks !=undefined ? drawing.remarks :undefined,
            editMode: false,
            progressId: drawing.progressId !=undefined?drawing.progressId : undefined,
            supportId: drawing.supportId,
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
  }

  toggleEdit(row: ProgressVO): void {
    if (row.editMode) {
      // Reset the highlight effect after 2 seconds
      this.saveProgressDetail(row).then(r => console.log('Saved row:', row));

    } else {
      // Enter edit mode
      row.editMode = true;
    }
  }


  async saveProgressDetail(row: ProgressVO) {
    if (row.editMode) {
      // Save changes
      row.editMode = false;
      row.isEdited = true;
      row.id = row.progressId != undefined ? row.progressId : undefined;
      try {
        const response = await firstValueFrom(
          this.progressSerivce.addProgressDetails(row)
        );
        row.isEdited = false;
        console.log('saved progress details successfully:', response);

      } catch (error) {
        console.error('Error fetching support details:', error);
        alert('Error submitting report. Please try again.');
      }
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
