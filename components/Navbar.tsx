import { checkUser } from "@/lib/checkUser"
import Link from "next/link"
const Navbar = () => {
    const user = checkUser()
    console.log('user: ', user)
    return (
        <div className="border-b border-stone-200 p-3 mb-5 shadow-2xl  ">
            <h1 className="text-4xl font-bold">Finance <span className="text-sm tracking-wider">Tracker</span> </h1>


           

        </div>
    )
}

export default Navbar
