import { checkUser } from "@/lib/checkUser"
import Link from "next/link"
import NavLinks from "./NavLinks"
import { SignedIn, SignedOut, SignIn, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
const Navbar = () => {
    const user = checkUser()
    console.log('user: ', user)
    return (
        <div>

            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <NavLinks />
                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
                    <Link href={'/'} className="text-xl md:text-3xl font-bold">Finance <span className="text-sm tracking-wider">Tracker.</span> </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <NavLinks />
                    </ul>
                </div>
                <div className="navbar-end menu menu-horizontal px-1">

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut >
                        <SignInButton>
                            <button className="btn btn-neutral btn-outline btn-sm tracking-wider mx-1">Sign in </button>
                        </SignInButton>

                        <SignUpButton>
                            <button className="btn btn-neutral btn-outline btn-sm tracking-wider mx-1">Sign up </button>
                        </SignUpButton>
                    </SignedOut>
                    {/* <li>
                        <details>
                            <summary>Settings</summary>
                            <ul className="p-2">
                                <li><a>Profile</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </details>
                    </li> */}
                </div>
            </div>
        </div>
    )
}

export default Navbar
