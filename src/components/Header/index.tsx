import { signOut, getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

function Header() {
  const auth = getAuth();
  const logout = () => signOut(auth);

  return (
    <div className="w-full bg-primary px-4 py-1 flex justify-between items-center text-white sticky top-0 left-0 z-[1]">
      <Link to={"/"}>
        <label className="text-4xl font-thin cursor-pointer">LATRIK RIS</label>
      </Link>
      <div className="flex items-center">
        <button onClick={() => logout()}>Cerrar sesión</button>
        {/* <img className="rounded-full h-14 mx-2" src="" /> */}
        {/* <div className="rounded-full h-14 w-14 mx-2 bg-white"></div> */}
        {/* <label>user 01</label> */}
      </div>
    </div>
  );
}

export default Header;
