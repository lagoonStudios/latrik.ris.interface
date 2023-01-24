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
  "Hombre",
  "Mujer",
  "Otro",
  "Na",
  Male,
  Female,
  Other,
}

export enum StudyPriority {
  "Baja",
  "Nomal",
  "Urgente",
  "Emergencia",
  LOW,
  NORMAL,
  URGENT,
  EMERGENCY,
}

export enum Status {
  "En espera",
  "En procesos",
  "Espera de reporte",
  "Reportando",
  "Reportado",
  "Terminado",
  "Suspendido",
  "Cancelado",
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