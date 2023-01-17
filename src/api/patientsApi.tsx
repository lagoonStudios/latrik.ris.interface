import axios from "axios";
import { Patient } from "models/latrikModels";

const patientApi = axios.create({
  baseURL: "http://localhost:8080/",
});

export async function getPatients() {
  return patientApi.get("patients");
}

export function getPatientById(id: string) {
  return patientApi.get("patients/" + id);
}

export function addPatient(params: Patient) {
  return patientApi.post("patients", params);
}
