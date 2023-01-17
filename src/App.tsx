import { Routes, Route, HashRouter } from 'react-router-dom';
import { SecretaryHome } from "./pages/SecretaryHome/index";
import Layout from "pages/Layout";
import StudyList from "pages/StudyList";
import PatientList from "pages/PatientList";
import StudyResumen from "pages/StudyResumen";
import PatientForm from 'pages/PatientForm';
import StudyForm from 'pages/StudyForm';

function App() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SecretaryHome />} />
          <Route path="PatientForm" element={<PatientForm />} />
          <Route path="StudyForm" element={<StudyForm />} />
          <Route path="StudyList" element={<StudyList />} />
          <Route path="PatientList" element={<PatientList />} />
          <Route path="StudyResumen/:id" element={<StudyResumen />} />
          <Route path="*" element={<SecretaryHome />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
