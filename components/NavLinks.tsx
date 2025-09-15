'use client'
import { SignedIn } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Home from '../app/page';


const NavLinks = () => {
    const pathName: String | null = usePathname()
    return (
        <>
            <li>
                <Link href={'/'}
                className={pathName === ('/') ? 'bg-stone-800 text-white' : ''}

            > Home  </Link>
            </li>

            <SignedIn>

                <li>
                    <Link href={'/dashboard'}
                        className={pathName.includes('/dashboard') ? 'bg-stone-800 text-white' : ''}

                    > Dashboard  </Link>
                </li>
                <li>
                    <Link href={'/dashboard'}
                        className={pathName.includes('/records') ? 'bg-stone-800 text-white' : ''}

                    > Records  </Link>
                </li>
                
                <li>
                    <Link href={''}> Activity  </Link>
                </li>


            </SignedIn>


            <li>
                <details>
                    <summary>Parent</summary>
                    <ul className="p-2">
                        <li>
                            <Link href={''} className="md:min-w-44" >Submenu again</Link>
                        </li>

                    </ul>
                </details>
            </li>




        </>
    )
}

export default NavLinks
