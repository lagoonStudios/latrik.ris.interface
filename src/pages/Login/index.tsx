import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useFirebaseApp, useUser } from "reactfire";

function Login() {
  const user = useUser();
  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const login = async () => {
    console.log("user: ", user);
    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <>
      <div className="flex items-center h-[100vh]">
        <div className="bg-primary h-full w-1/3 -z-10 absolute top-0 left-0">
          {/* background azul oscuro */}
        </div>
        <div className="w-1/3 min-w-[33.33333%] text-white text-8xl">
          <div className="m-auto text-center">
            <p>LAT</p>
            <p>RIK</p>
            <p>RIS</p>
          </div>
        </div>
        <div className="w-[56%] max-w-[800px] m-auto">
          <div className="shadow-buttonShadow p-14 rounded-[40px] bg-white">
            <h1 className="text-center font-bold text-2xl mb-10">
              Inicia sesión
            </h1>
            <form>
              <label htmlFor="email" className="font-bold text-2xl">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <label htmlFor="password" className="font-bold text-2xl">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <button
                type="button"
                onClick={() => login()}
                className="block filledPrimary rounded-3xl m-auto mt-10 w-48 h-10 text-2xl"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
