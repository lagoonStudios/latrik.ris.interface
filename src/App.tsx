
import { AuthProvider, useFirebaseApp, useUser } from "reactfire";
import { getAuth } from "firebase/auth";
import CustomRouter from "CustomRouter";

function App() {
  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);
  // const user = useUser();
  return (
    <AuthProvider sdk={auth}>
      <CustomRouter />
    </AuthProvider>
  );
}

export default App;
