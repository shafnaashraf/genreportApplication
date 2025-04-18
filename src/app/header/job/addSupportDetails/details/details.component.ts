import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

interface SupportDetail {
  drawingNo: string;
  desc: string;
  qty: string;
  itemNo: string;
  itemDesc: string;
  specGrade: string;
}

@Component({
  selector: 'details-supp',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.css'],
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class DetailsComponent {
  @Input()
  jobDetails!: { jobNumber: string; reportNumber: string; client: string; project: string; title: string };

  newSupport: SupportDetail = {
    drawingNo: '',
    desc: '',
    qty: '',
    itemNo: '',
    itemDesc: '',
    specGrade: ''
  };

  supportList: SupportDetail[] = [];
  editingSupport: SupportDetail | null = null;
  editingIndex: number = -1;

  saveSupport() {
    if (this.newSupport.drawingNo !== '') {
      this.supportList.push({ ...this.newSupport });
      this.newSupport = {
        drawingNo: '',
        desc: '',
        qty: '',
        itemNo: '',
        itemDesc: '',
        specGrade: ''
      };
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

  saveEditedSupport() {
    if (this.editingSupport && this.editingIndex >= 0) {
      this.supportList[this.editingIndex] = { ...this.editingSupport };
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editingSupport = null;
    this.editingIndex = -1;
  }
}
