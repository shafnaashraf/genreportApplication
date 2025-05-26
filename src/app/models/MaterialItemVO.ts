export interface MaterialItemVO {
  slNo?: number;
  drawingNumber: string;
  assemblyTagNo: string;
  qty: number;
  itemNo: number;
  itemDesc: string;
  specifGrade: string;
  thkSize?: string;
  heatNo?: string;
  mtcNo?: string;
  igirNo?: string;
  remarks?: string;
  reportNo?: string;
  isSelected?: boolean;
  isEditing?: boolean;
  supportId:string;
  materialId?:string;
  subJobNumber?:string;
  jobNumber?:string;
}
