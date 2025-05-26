// material-tracking.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MaterialTrackingService} from '../../services/materialTracking.service';
import {MaterialItemVO} from '../../models/MaterialItemVO';
import {firstValueFrom} from 'rxjs';
import {ProgressVO} from '../../models/ProgressVO';



@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  searchForm!: FormGroup;
  materialItems: MaterialItemVO[] = [];
  showResults = false;
  currentReportNumber = '';
  allSelected = false;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder,private materialTrackingService: MaterialTrackingService) { }

  ngOnInit(): void {
    this.initSearchForm();
    // Mock data for demonstration
  }

  initSearchForm(): void {
    this.searchForm = this.fb.group({
      jobNumber: ['8031', Validators.required],
      subJobNumber: ['01', Validators.required],
      drawingNo: ['d1', Validators.required]
    });
  }

  async search() {
     this.loading = true;
     this.error = null;
     const { jobNumber, subJobNumber, drawingNo } = this.searchForm.value;
    if (jobNumber && subJobNumber && drawingNo) {
      this.materialItems = [];
      try {
        const response = await firstValueFrom(
          this.materialTrackingService.searchMaterialItems(jobNumber, subJobNumber, drawingNo)
        );
        this.showResults = true;
        this.loading = false;
        console.log('fetched sub job details successfully:', response);

        response.forEach(material => {
          const materialDetails : MaterialItemVO = {
            drawingNumber : material.drawingNumber,
            assemblyTagNo : material.assemblyTagNo,
            qty : material.qty,
            itemNo: material.itemNo,
            itemDesc: material.itemDesc,
            specifGrade: material.specifGrade,
            supportId: material.supportId,
            materialId: material.materialId!=undefined ? material.materialId :undefined,
            subJobNumber: material.subJobNumber,
            jobNumber: material.jobNumber,
            thkSize:  material.thkSize !=undefined ? material.thkSize :undefined,
            heatNo:  material.heatNo !=undefined ? material.heatNo :undefined,
            mtcNo:  material.mtcNo !=undefined ? material.mtcNo :undefined,
            igirNo: material.igirNo !=undefined ? material.igirNo :undefined,
            remarks: material.remarks !=undefined ? material.remarks :undefined,
            reportNo: material.reportNo !=undefined ? material.reportNo :undefined,
          }
          this.materialItems.push(materialDetails);
        })

      } catch (error) {
        console.error('Error fetching material items:', error);
        this.error = 'Failed to fetch data. Please try again.';
        this.loading = false;
      }
    }
  }

  exportReport(): void {
    // Implement export functionality
    console.log('Exporting report...');
    alert('Report exported successfully!');
  }

  toggleSelection(item: MaterialItemVO): void {
    item.isSelected = !item.isSelected;
    this.updateAllSelectedState();
  }

  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.materialItems.forEach(item => {
      item.isSelected = this.allSelected;
    });
  }

  updateAllSelectedState(): void {
    this.allSelected = this.materialItems.length > 0 &&
      this.materialItems.every(item => item.isSelected);
  }

  toggleEditMode(item: MaterialItemVO): void {
    // First close any other items being edited
    this.materialItems.forEach(i => {
      if (i !== item && i.isEditing) {
        i.isEditing = false;
      }
    });

    item.isEditing = !item.isEditing;
  }

  saveItem(item: MaterialItemVO): void {
    this.saveMaterialDetail(item).then(() => console.log('Saved row:', item));
  }

  async saveMaterialDetail(row: MaterialItemVO) {
      // Save changes
      try {
        const response = await firstValueFrom(
          this.materialTrackingService.addMaterialDetails(row)
        );
        row.isEditing = false;
        console.log('saved material details successfully:', response);

      } catch (error) {
        console.error('Error saving material details:', error);
      }
  }

  hasSelectedItems(): boolean {
    return this.materialItems.some(item => item.isSelected);
  }

  applyReportNumber(): void {
    if (!this.currentReportNumber) {
      alert('Please enter a report number');
      return;
    }

    const selectedItems = this.materialItems.filter(item => item.isSelected);
    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }
    this.saveReportNumber(selectedItems);
  }

  async saveReportNumber(selectedItems: MaterialItemVO[]) {
    // Assign the report number to all selected items
    const materialIds : string[] = [];
    selectedItems.forEach(item => {
      item.reportNo = this.currentReportNumber;
      if(item.materialId){
        materialIds.push(<string>item.materialId);
      }
    });
    // Save changes if there is already material details in material table
    if(materialIds != null && this.currentReportNumber){
      try {
        const response = await firstValueFrom(
          this.materialTrackingService.addReportNumber(materialIds,this.currentReportNumber)
        );
        // Show success message
        this.showToast(`Report number ${this.currentReportNumber} applied to ${selectedItems.length} items`);

        // Clear selections and report number
        this.materialItems.forEach(item => item.isSelected = false);
        this.allSelected = false;
        this.currentReportNumber = '';

      } catch (error) {
        console.error('Error saving material details:', error);
      }
    }
    else{ //if no material details are entered into material table we have to add new record to table and save the corresponding report no.
      try {
        const response = await firstValueFrom(
          this.materialTrackingService.addMaterialDetailsForMultiple(selectedItems)
        );
        // Show success message
        this.showToast(`Report number ${this.currentReportNumber} applied to ${selectedItems.length} items`);

        // Clear selections and report number
        this.materialItems.forEach(item => item.isSelected = false);
        this.allSelected = false;
        this.currentReportNumber = '';

      } catch (error) {
        console.error('Error saving material details:', error);
      }
    }

  }

  showToast(message: string): void {
    // Simple toast implementation - in a real app you'd use a proper toast/notification service
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 3000);
    }, 100);
  }

}
