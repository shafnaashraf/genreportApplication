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

  showReportHeader: boolean = false;

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
}
