import { Routes, Route, HashRouter } from 'react-router-dom';
import { SecretaryHome } from "./pages/SecretaryHome/index";
import Layout from "pages/Layout";
import StudyList from "pages/StudyList";
import PatientList from "pages/PatientList";
import StudyDetail from "pages/StudyDetail";
import PatientForm from 'pages/PatientForm';
import RegisterStudy from 'pages/RegisterStudy';

function App() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SecretaryHome />} />
          <Route path="PatientForm" element={<PatientForm />} />
          <Route path="RegisterStudy" element={<RegisterStudy />} />
          <Route path="StudyList" element={<StudyList />} />
          <Route path="PatientList" element={<PatientList />} />
          <Route path="StudyDetail" element={<StudyDetail />} />
          <Route path="*" element={<SecretaryHome />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
