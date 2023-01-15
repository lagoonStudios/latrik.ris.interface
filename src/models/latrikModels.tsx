export class Patient {
  id?: string;
  patientId: string;
  name: string;
  email: string;
  phoneNumber?: string;
  birthDate?: Date | string;
  gender: Gender;
  allergies?: string;
  medicalCondition?: string;

  constructor(data: any) {
    this.id = data?.id || "";
    this.patientId = data?.patientId || "";
    this.name = data?.name || "";
    this.email = data?.email || "";
    this.phoneNumber = data?.phoneNumber || "";
    this.birthDate = data?.birthDate || "";
    this.gender = data?.gender || "Otro";
    this.allergies = data?.allergies || "";
    this.medicalCondition = data?.medicalCondition || "";
  }
}

export class Study {
  id: string;
  patient_id: string;
  studyDate: Date | string;
  modality: Modality;
  process: string;
  state: Status
  studyPriority: StudyPriority;
  report?: any;
  referentDoctorId?: string;
  assignedTecnician?: string;
  assignedDoctor?: string;
  studyinstanceuid?: string;
  pacsuid?: string;

  constructor(data: any) {
    this.id = data.id;
    this.patient_id = data.patient_id;
    this.studyDate = data.studyDate;
    this.modality = data.modality;
    this.process = data.process;
    this.state = data.state;
    this.studyPriority = data.studyPriority;
    this.report = data.report;
    this.referentDoctorId = data.referentDoctorId;
    this.assignedTecnician = data.assignedTecnician;
    this.assignedDoctor = data.assignedDoctor;
    this.studyinstanceuid = data.studyinstanceuid;
    this.pacsuid = data.pacsuid;
  }
}

export enum Gender {
  Male,
  Female,
  Other,
  Na
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
  SR
}
