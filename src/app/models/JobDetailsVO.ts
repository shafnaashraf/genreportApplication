import {SubJobDetailsVO} from './SubJobDetailsVO';

export interface JobDetailsVO {
  jobNumber: string;
  clientName: string;
  projectDesc: string;
  subJobDetails: SubJobDetailsVO[];
}
