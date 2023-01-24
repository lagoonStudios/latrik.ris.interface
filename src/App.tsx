
import { AuthProvider, useFirebaseApp } from "reactfire";
import { getAuth } from "firebase/auth";
import CustomRouter from "CustomRouter";
import { Toaster } from "react-hot-toast";

function App() {
  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);

  return (
    <AuthProvider sdk={auth}>
      <CustomRouter />
      <Toaster position="top-right" toastOptions={{id: 'toast'}} />
    </AuthProvider>
  );
}

export default App;
