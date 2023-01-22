import axios from "axios";
import { Study } from 'models/latrikModels';

const studiesApi = axios.create({
  baseURL: "http://localhost:8080/",
});

export function getStudies() {
  return studiesApi.get("studies")
}

export function getStudyById(id: string){
    return studiesApi.get("studies/"+id)
}

export function addStudy(params: Study) {
  return studiesApi.post("studies/", params);
}