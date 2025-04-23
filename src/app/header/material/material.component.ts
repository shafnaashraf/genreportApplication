// material-tracking.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MaterialTrackingService} from '../../services/materialTracking.service';

interface MaterialItem {
  slNo: number;
  drawingNo: string;
  descriptionAssemblyTagNo: string;
  qty: number;
  itemNo: number;
  itemDescription: string;
  specificationGrade: string;
  thkSize: string;
  heatNo: string;
  mtcNo: string;
  igirNo: string;
  remarks: string;
  reportNumber?: string;
  isSelected: boolean;
  isEditing: boolean;
}

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
  materialItems: MaterialItem[] = [];
  showResults = false;
  currentReportNumber = '';
  allSelected = false;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder,private materialTrackingService: MaterialTrackingService) { }

  ngOnInit(): void {
    this.initSearchForm();
    // Mock data for demonstration
    this.materialItems = this.getMockData();
  }

  initSearchForm(): void {
    this.searchForm = this.fb.group({
      jobNumber: ['2403', Validators.required],
      subJobNumber: ['001', Validators.required],
      drawingNo: ['AW-D-100-16"-CS', Validators.required]
    });
  }

  search(): void {
    // In a real application, you would call an API here
    // For demo, we'll just show the mock data
    this.showResults = true;
    // this.loading = true;
    // this.error = null;
    // const { jobNumber, subJobNumber, drawingNo } = this.searchForm.value;
    //
    // this.materialTrackingService.searchMaterialItems(jobNumber, subJobNumber, drawingNo)
    //   .subscribe({
    //     next: (data) => {
    //       this.materialItems = data;
    //       this.showResults = true;
    //       this.loading = false;
    //     },
    //     error: (err) => {
    //       console.error('Error fetching material items:', err);
    //       this.error = 'Failed to fetch data. Please try again.';
    //       this.loading = false;
    //     }
    //   });
  }

  exportReport(): void {
    // Implement export functionality
    console.log('Exporting report...');
    alert('Report exported successfully!');
  }

  toggleSelection(item: MaterialItem): void {
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

  toggleEditMode(item: MaterialItem): void {
    // First close any other items being edited
    this.materialItems.forEach(i => {
      if (i !== item && i.isEditing) {
        i.isEditing = false;
      }
    });

    item.isEditing = !item.isEditing;
  }

  saveItem(item: MaterialItem): void {
    item.isEditing = false;
    // Here you would typically send the updated item to your backend
    console.log('Saving item:', item);
    // Show success message
    this.showToast('Item updated successfully!');
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

    // Assign the report number to all selected items
    selectedItems.forEach(item => {
      item.reportNumber = this.currentReportNumber;
    });

    // Show success message
    this.showToast(`Report number ${this.currentReportNumber} applied to ${selectedItems.length} items`);

    // Clear selections and report number
    this.materialItems.forEach(item => item.isSelected = false);
    this.allSelected = false;
    this.currentReportNumber = '';
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

  // Mock data for demonstration
  getMockData(): MaterialItem[] {
    return [
      {
        slNo: 1,
        drawingNo: 'SW-300-100-16"-CS',
        descriptionAssemblyTagNo: 'BM-1',
        qty: 1,
        itemNo: 1,
        itemDescription: 'BEAM, HEA 100, EN 10025 S275JR',
        specificationGrade: 'S275JR',
        thkSize: '',
        heatNo: '',
        mtcNo: '',
        igirNo: '',
        remarks: '',
        isSelected: false,
        isEditing: false
      },
      {
        slNo: 2,
        drawingNo: 'AW-D-100-16"-CS',
        descriptionAssemblyTagNo: 'BM-2',
        qty: 1,
        itemNo: 2,
        itemDescription: 'BEAM, HEA 100, EN 10025 S275JR',
        specificationGrade: 'S275JR',
        thkSize: '',
        heatNo: '',
        mtcNo: '',
        igirNo: '',
        remarks: '',
        isSelected: false,
        isEditing: false
      },
      {
        slNo: 3,
        drawingNo: 'SW-450-100-16"-CS',
        descriptionAssemblyTagNo: 'BM-3',
        qty: 1,
        itemNo: 3,
        itemDescription: 'PLATE THK 10MM, EN 10025 S275JR',
        specificationGrade: 'S275JR',
        thkSize: '',
        heatNo: '',
        mtcNo: '',
        igirNo: '',
        remarks: '',
        isSelected: false,
        isEditing: false
      },
      {
        slNo: 4,
        drawingNo: 'SW-300-100-12"-CS',
        descriptionAssemblyTagNo: 'BM-4',
        qty: 1,
        itemNo: 4,
        itemDescription: 'PLATE THK 10MM, EN 10025 S275JR',
        specificationGrade: 'S275JR',
        thkSize: '',
        heatNo: '',
        mtcNo: '',
        igirNo: '',
        remarks: '',
        isSelected: false,
        isEditing: false
      },
      {
        slNo: 5,
        drawingNo: 'SW-300-100-12"-CS',
        descriptionAssemblyTagNo: 'BM-4',
        qty: 1,
        itemNo: 5,
        itemDescription: 'BEAM, HEA 100, EN 10025 S275JR',
        specificationGrade: 'S275JR',
        thkSize: '',
        heatNo: '',
        mtcNo: '',
        igirNo: '',
        remarks: '',
        isSelected: false,
        isEditing: false
      },
      {
        slNo: 6,
        drawingNo: 'SW-300-100-8"-CS',
        descriptionAssemblyTagNo: 'BM-5',
        qty: 1,
        itemNo: 5,
        itemDescription: 'PLATE THK 10MM, EN 10025 S275JR',
        specificationGrade: 'S275JR',
        thkSize: '',
        heatNo: '',
        mtcNo: '',
        igirNo: '',
        remarks: '',
        isSelected: false,
        isEditing: false
      }
    ];
  }
}
