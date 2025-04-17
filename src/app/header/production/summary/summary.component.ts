import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

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
  selectedReportNumbers: string[] = [];

  availableReportNumbers: string[] = ['RPT001', 'RPT002', 'RPT003' ,'12','321','321'];

  jobNumber: string = '';
  reportNumber: string = '';
  showReportHeader: boolean = false;

  searchReport() {
    // You can add actual logic here to fetch report data
    this.jobNumber = this.searchJobNumber;
    //this.reportNumber = this.searchReportNumber;

    this.showReportHeader = true;
  }


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
    return 1;
  }

  summaryRows = [
    {
      jobNumber: 'REST',
      title: 'PIPE SHOE SUPPORT',
      totalQty: '9',
      uom: 'NOS',
      cutting: '100%',
      fitup: '100%',
      welding: '100%',
      fabricationComp: '100%',
      paintReleaseDate: '',
      blastPaint: '0%',
      comp: '85%',
      remarks: '',
      isEditing: false
    },
    // add more rows here...
  ];

  toggleEdit(row: any) {
    row.isEditing = !row.isEditing;
  }

}
