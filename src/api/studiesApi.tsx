import axios from "axios";

const studiesApi = axios.create({
  baseURL: "http://localhost:8080/",
});

export function getStudies() {
  return studiesApi.get("studies")
}

export function getStudyById(id: string){
    return studiesApi.get("studies/"+id)
}