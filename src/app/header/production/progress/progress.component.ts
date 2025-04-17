import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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

  availableReportNumbers: string[] = ['RPT001', 'RPT002', 'RPT003' ,'12','321','321'];

  showReportHeader: boolean = false; //implement ngif for table

  showDropdown = false

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleReportSelection(report: string, event: any) {
    if (event.target.checked) {
      this.selectedReportNumbers.push(report);
    } else {
      this.selectedReportNumbers = this.selectedReportNumbers.filter(r => r !== report);
    }
  }

  search() {
    return 1; //write backend logic here
  }

  rows = [
    {
      assemblyTagNo: 'BM-1',
      drawingNo: 'SW-300-100-16"-CS',
      title: 'PIPE SHOE SUPPORT',
      weight: 1,
      qty: 1,
      cutting: '100%',
      fitup: '100%',
      welding: '100%',
      paintReleaseDate: '',
      blastPaint: '0%',
      remarks: '',
      editMode: false
    },
    {
      assemblyTagNo: 'BM-2',
      drawingNo: 'SW-300-100-16"-CS',
      title: 'PIPE  SUPPORT',
      weight: 1,
      qty: 1,
      cutting: '100%',
      fitup: '100%',
      welding: '100%',
      paintReleaseDate: '',
      blastPaint: '0%',
      remarks: '',
      editMode: false
    },
    {
      assemblyTagNo: 'BM-2',
      drawingNo: 'SW-300-100-16"-CS',
      title: 'PIPE  SUPPORT',
      weight: 1,
      qty: 1,
      cutting: '100%',
      fitup: '100%',
      welding: '100%',
      paintReleaseDate: '',
      blastPaint: '0%',
      remarks: '',
      editMode: false
    },
    {
      assemblyTagNo: 'BM-2',
      drawingNo: 'SW-300-100-16"-CS',
      title: 'PIPE  SUPPORT',
      weight: 1,
      qty: 1,
      cutting: '100%',
      fitup: '100%',
      welding: '100%',
      paintReleaseDate: '',
      blastPaint: '0%',
      remarks: '',
      editMode: false
    },
    {
      assemblyTagNo: 'BM-2',
      drawingNo: 'SW-300-100-16"-CS',
      title: 'PIPE  SUPPORT',
      weight: 1,
      qty: 1,
      cutting: '100%',
      fitup: '100%',
      welding: '100%',
      paintReleaseDate: '',
      blastPaint: '0%',
      remarks: '',
      editMode: false
    },
    {
      assemblyTagNo: 'BM-2',
      drawingNo: 'SW-300-100-16"-CS',
      title: 'PIPE  SUPPORT',
      weight: 1,
      qty: 1,
      cutting: '100%',
      fitup: '100%',
      welding: '100%',
      paintReleaseDate: '',
      blastPaint: '0%',
      remarks: '',
      editMode: false
    },
    {
      assemblyTagNo: 'BM-2',
      drawingNo: 'SW-300-100-16"-CS',
      title: 'PIPE  SUPPORT',
      weight: 1,
      qty: 1,
      cutting: '100%',
      fitup: '100%',
      welding: '100%',
      paintReleaseDate: '',
      blastPaint: '0%',
      remarks: '',
      editMode: false
    },
    {
      assemblyTagNo: 'BM-2',
      drawingNo: 'SW-300-100-16"-CS',
      title: 'PIPE  SUPPORT',
      weight: 1,
      qty: 1,
      cutting: '100%',
      fitup: '100%',
      welding: '100%',
      paintReleaseDate: '',
      blastPaint: '0%',
      remarks: '',
      editMode: false
    },
    {
      assemblyTagNo: 'BM-2',
      drawingNo: 'SW-300-100-16"-CS',
      title: 'PIPE  SUPPORT',
      weight: 1,
      qty: 1,
      cutting: '100%',
      fitup: '100%',
      welding: '100%',
      paintReleaseDate: '',
      blastPaint: '0%',
      remarks: '',
      editMode: false
    },

    // Add more rows if needed
  ];

  toggleEdit(row: any) {
    row.editMode = !row.editMode;
    if (!row.editMode) {
      // Optional: Save logic here (e.g. send to backend)
      console.log('Saved Row:', row);
    }
  }
}
