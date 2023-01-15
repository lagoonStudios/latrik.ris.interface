export class Patient {
  id?: string;
  patientId: string;
  name: string;
  email: string;
  phoneNumber?: string;
  birthDate?: Date | string;
  gender: "Male" | "Female" | "Other";
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
  modality: "CT" | "MR" | "PR" | "CR";
  process: string;
  state:
    | "Espera"
    | "Proceso"
    | "Por informar"
    | "Completado"
    | "Cerrado"
    | "Cancelado";
  priority: "Low" | "Normal" | "Urgent" | "Emergency";
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
    this.priority = data.priority;
    this.report = data.report;
    this.referentDoctorId = data.referentDoctorId;
    this.assignedTecnician = data.assignedTecnician;
    this.assignedDoctor = data.assignedDoctor;
    this.studyinstanceuid = data.studyinstanceuid;
    this.pacsuid = data.pacsuid;
  }
}

export class Gender {
  name: "Male" | "Female" | "Other";

  constructor(gender: "Male" | "Female" | "Other") {
    this.name = gender;
  }

  getGender() {
    switch (this.name) {
      case "Male":
        return "Hombre";
      case "Female":
        return "Mujer";
      case "Other":
        return "Otro";
    }
  }
}

export enum Priority {
  Low = "Low",
  Normal = "Normal",
  Urgent = "Urgent",
  Emergency = "Emergency",
}

export enum State {
  "Espera",
  "Proceso",
  "Por informar",
  "Completado",
  "Cerrado",
  "Cancelado",
}

export enum Modality {
  "CT",
  "MR",
  "PR",
  "CR",
}
