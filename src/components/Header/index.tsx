import { Link } from "react-router-dom"

function Header(){
    return (
        <div className="w-full bg-secondary p-4 flex justify-between items-center">
            <Link to={'/'}>
            <label className="text-4xl font-thin cursor-pointer">LATRIK RIS</label>
            </Link>
            <div className="flex items-center">
                {/* <img className="rounded-full h-14 mx-2" src="" /> */}
                <div className="rounded-full h-14 w-14 mx-2 bg-white"></div>
                <label>user 01</label>
            </div>
        </div>
    )
}

export default Header