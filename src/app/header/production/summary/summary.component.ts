import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface ProgressRow {
  jobNo: string;
  title: string;
  totalQty: string;
  UOM: string;
  cutting: string;
  fitup: string;
  welding: string;
  fabCompPercent: string;
  paintReleaseDate: string;
  blastPaint: string;
  compPercent:string;
  remarks: string;
  editMode: boolean;
  isEdited?: boolean;
  jobNumber: string;
  subJobNumber: string;
}

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
  availableSubJobNumbers: string[] = ['1', '2', '3', '4', '5'];
  showDropdown: boolean = false;
  rows: ProgressRow[] = [];
  filteredRows: ProgressRow[] = [];
  searchPerformed: boolean = false;
  hasSearchResults: boolean = false;

  ngOnInit(): void {
    // Sample data
    this.rows = [
      {
        jobNo: 'A001',
        fabCompPercent: 'DWG-2403-001',
        title: 'HEADER SECTION 1 rythjukcmjgfkmjjkkjkhjjfhjkjh',
        UOM: '450',
        totalQty: '1',
        cutting: '100%',
        fitup: '80%',
        welding: '65%',
        paintReleaseDate: '2025-05-15',
        blastPaint: '0%',
        compPercent:'20%',
        remarks: '',
        editMode: false,
        jobNumber: '2403',
        subJobNumber: '1'
      },
      {
        jobNo: 'A001',
        fabCompPercent: 'DWG-2403-001',
        title: 'HEADER SECTION 1',
        UOM: '450',
        totalQty: '1',
        cutting: '100%',
        fitup: '80%',
        welding: '65%',
        paintReleaseDate: '2025-05-15',
        blastPaint: '0%',
        compPercent:'20%',
        remarks: '',
        editMode: false,
        jobNumber: '2403',
        subJobNumber: '1'
      },
      {
        jobNo: 'A001',
        fabCompPercent: 'DWG-2403-001',
        title: 'HEADER SECTION 1',
        UOM: '450',
        totalQty: '1',
        cutting: '100%',
        fitup: '80%',
        welding: '65%',
        paintReleaseDate: '2025-05-15',
        blastPaint: '0%',
        compPercent:'20%',
        remarks: '',
        editMode: false,
        jobNumber: '2403',
        subJobNumber: '1'
      },
      {
        jobNo: 'A001',
        fabCompPercent: 'DWG-2403-001',
        title: 'HEADER SECTION 1',
        UOM: '450',
        totalQty: '1',
        cutting: '100%',
        fitup: '80%',
        welding: '65%',
        paintReleaseDate: '2025-05-15',
        blastPaint: '0%',
        compPercent:'20%',
        remarks: '',
        editMode: false,
        jobNumber: '2403',
        subJobNumber: '1'
      }, {
        jobNo: 'A001',
        fabCompPercent: 'DWG-2403-001',
        title: 'HEADER SECTION 1',
        UOM: '450',
        totalQty: '1',
        cutting: '100%',
        fitup: '80%',
        welding: '65%',
        paintReleaseDate: '2025-05-15',
        blastPaint: '0%',
        compPercent:'20%',
        remarks: '',
        editMode: false,
        jobNumber: '2403',
        subJobNumber: '1'
      }
    ];
  }

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

  search(): void {
    // Mark that search has been performed
    this.searchPerformed = true;

    // Close dropdown
    this.showDropdown = false;

    // Filter rows based on search criteria
    if (this.searchJobNumber && this.selectedSubJobNumbers.length > 0) {
      this.filteredRows = this.rows.filter(row =>
        row.jobNumber === this.searchJobNumber &&
        this.selectedSubJobNumbers.includes(row.subJobNumber)
      );
    } else if (this.searchJobNumber) {
      this.filteredRows = this.rows.filter(row =>
        row.jobNumber === this.searchJobNumber
      );
    } else if (this.selectedSubJobNumbers.length > 0) {
      this.filteredRows = this.rows.filter(row =>
        this.selectedSubJobNumbers.includes(row.subJobNumber)
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
