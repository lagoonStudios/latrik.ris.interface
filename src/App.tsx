import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SecretaryResumen } from './pages/SecretaryResumen/index';
import RegisterPatient from './pages/RegisterPatient/index';
import Layout from './pages/Layout';

function App(){
    return(
            <BrowserRouter>
            <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<SecretaryResumen />} />
                <Route path='RegisterPatient' element={<RegisterPatient />} />
                {/* <Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NoPage />} /> */}
            </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App