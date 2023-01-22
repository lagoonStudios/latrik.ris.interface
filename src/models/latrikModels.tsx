export interface Study {
  id?:                 string;
  patient?:            Patient;
  studyDate:          string;
  modality:           Modality;
  studyInstanceUID?:   string;
  pacsUID?:            string;
  referringPhysician: string;
  procedure:          string;
  status:             Status;
  priority:           StudyPriority;
}

export interface Patient {
  id:               string;
  name:             string;
  patientId:        string;
  email:            string;
  phoneNumber:      string;
  birthDate:        string;
  gender:           Gender;
  allergies:        string;
  medicalCondition: string;
}


export enum Gender {
  Male,
  Female,
  Other,
  Na,
}

export enum StudyPriority {
  LOW,
  NORMAL,
  URGENT,
  EMERGENCY,
}

export enum Status {
  PENDING,
  IN_PROCESS,
  TO_REPORT,
  REPORTING,
  REPORTED,
  FINISHED,
  SUSPENDED,
  CANCELED,
}

export enum Modality {
  CR,
  DX,
  CT,
  MR,
  XA,
  MG,
  US,
  PT,
  NM,
  RF,
  RG,
  PX,
  ES,
  XC,
  GM,
  SC,
  OT,
  SR,
}