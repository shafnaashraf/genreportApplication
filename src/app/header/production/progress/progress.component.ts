import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

interface ProgressRow {
  assemblyTagNo: string;
  drawingNo: string;
  title: string;
  weight: string;
  qty: string;
  cutting: string;
  fitup: string;
  welding: string;
  paintReleaseDate: string;
  blastPaint: string;
  remarks: string;
  editMode: boolean;
  isEdited?: boolean;
  jobNumber: string;
  reportNumber: string;
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
  selectedReportNumbers: string[] = [];
  availableReportNumbers: string[] = ['1', '2', '3', '4', '5'];
  showDropdown: boolean = false;
  rows: ProgressRow[] = [];
  filteredRows: ProgressRow[] = [];
  searchPerformed: boolean = false;
  hasSearchResults: boolean = false;

  ngOnInit(): void {
    // Sample data
    this.rows = [
      {
        assemblyTagNo: 'A001',
        drawingNo: 'DWG-2403-001',
        title: 'HEADER SECTION 1',
        weight: '450',
        qty: '1',
        cutting: '100%',
        fitup: '80%',
        welding: '65%',
        paintReleaseDate: '2025-05-15',
        blastPaint: '0%',
        remarks: '',
        editMode: false,
        jobNumber: '2403',
        reportNumber: '1'
      },
      {
        assemblyTagNo: 'A002',
        drawingNo: 'DWG-2403-002',
        title: 'HEADER SECTION 2',
        weight: '520',
        qty: '1',
        cutting: '100%',
        fitup: '75%',
        welding: '50%',
        paintReleaseDate: '2025-05-20',
        blastPaint: '0%',
        remarks: 'Awaiting material',
        editMode: false,
        jobNumber: '2404',
        reportNumber: '1'
      },
      {
        assemblyTagNo: 'A003',
        drawingNo: 'DWG-2403-003',
        title: 'ELBOW JOINT',
        weight: '180',
        qty: '2',
        cutting: '90%',
        fitup: '60%',
        welding: '40%',
        paintReleaseDate: '2025-05-22',
        blastPaint: '0%',
        remarks: '',
        editMode: false,
        jobNumber: '2404',
        reportNumber: '2'
      },
      {
        assemblyTagNo: 'B001',
        drawingNo: 'DWG-2404-001',
        title: 'SUPPORT BRACKET',
        weight: '85',
        qty: '4',
        cutting: '100%',
        fitup: '100%',
        welding: '100%',
        paintReleaseDate: '2025-05-10',
        blastPaint: '50%',
        remarks: '',
        editMode: false,
        jobNumber: '2404',
        reportNumber: '1'
      }
    ];
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  toggleReportSelection(report: string, event: any): void {
    if (event.target.checked) {
      this.selectedReportNumbers.push(report);
    } else {
      this.selectedReportNumbers = this.selectedReportNumbers.filter(r => r !== report);
    }
  }

  search(): void {
    // Mark that search has been performed
    this.searchPerformed = true;

    // Close dropdown
    this.showDropdown = false;

    // Filter rows based on search criteria
    if (this.searchJobNumber && this.selectedReportNumbers.length > 0) {
      this.filteredRows = this.rows.filter(row =>
        row.jobNumber === this.searchJobNumber &&
        this.selectedReportNumbers.includes(row.reportNumber)
      );
    } else if (this.searchJobNumber) {
      this.filteredRows = this.rows.filter(row =>
        row.jobNumber === this.searchJobNumber
      );
    } else if (this.selectedReportNumbers.length > 0) {
      this.filteredRows = this.rows.filter(row =>
        this.selectedReportNumbers.includes(row.reportNumber)
      );
    } else {
      // If no search criteria, show nothing
      this.filteredRows = [];
    }

    // Update search results flag
    this.hasSearchResults = this.filteredRows.length > 0;

    console.log('Search results:', this.filteredRows.length);
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
