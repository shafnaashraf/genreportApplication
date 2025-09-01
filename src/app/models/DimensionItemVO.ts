export interface DimensionItemVO {
  id?: number;
  drawingNo: string;
  qty?: string;
  details?: string;
  drawingDimension?: number | null;
  actualDimension?: number | null;
  variation?: number | null;
  result?: string;
  reportNumber?: string;
  isSelected: boolean;
  isEditing: boolean;

}
