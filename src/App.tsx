import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SecretaryResumen } from "./pages/SecretaryResumen/index";
import RegisterPatient from "./pages/RegisterPatient/index";
import Layout from "./pages/Layout";
import StudyList from "pages/StudyList";
import PatientList from "pages/PatientList";
import StudyResumen from "pages/StudyResumen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SecretaryResumen />} />
          <Route path="RegisterPatient" element={<RegisterPatient />} />
          <Route path="StudyList" element={<StudyList />} />
          <Route path="PatientList" element={<PatientList />} />
          <Route path="StudyResumen/:id" element={<StudyResumen />} />
          <Route path="*" element={<SecretaryResumen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
