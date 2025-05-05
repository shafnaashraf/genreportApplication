import {SubJobDetailsVO} from './SubJobDetailsVO';

export interface JobDetailsVO {
  jobNumber: string;
  clientName: string;
  title: string;
  projectDesc: string;
  subJobDetails: SubJobDetailsVO[];
}
