import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

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
  styleUrl: 'details.component.css',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})


export class DetailsComponent{

  @Input()
  jobDetails!: { jobNumber: string; reportNumber: string; client : string ; project : string;title : string };

  newSupport: SupportDetail = {
    drawingNo: '',
    desc: '',
    qty: '',
    itemNo: '',
    itemDesc: '',
    specGrade: ''
  };

  supportList: SupportDetail[] = [];

  saveSupport() {
    if(this.newSupport.drawingNo != ''){
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

  editingRow: any = null;

  editSupport(support: any) {
    this.editingRow = support; // clone the object to avoid modifying directly
  }

  saveEditedSupport(original: any) {
    Object.assign(original, this.editingRow); // update original with edited data
    this.editingRow = null;
  }

}
