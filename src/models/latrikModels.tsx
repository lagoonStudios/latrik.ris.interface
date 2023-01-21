export interface Study {
  id?:                 string;
  patient?:            Patient;
  studyDate:          string;
  modality:           string;
  studyInstanceUID?:   string;
  pacsUID?:            string;
  referringPhysician: string;
  procedure:          string;
  status:             string;
  priority:           string;
}

export interface Patient {
  id:               string;
  name:             string;
  patientId:        string;
  email:            string;
  phoneNumber:      string;
  birthDate:        string;
  gender:           string;
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