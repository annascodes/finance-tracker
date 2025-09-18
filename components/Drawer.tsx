import Link from 'next/link'
import React from 'react'
import Header from './Header';
import { LuPanelLeftOpen } from "react-icons/lu";


const Drawer = () => {
    const handleClose = () => {
        const drawerCheckbox = document.getElementById(
            "my-drawer"
        ) as HTMLInputElement;
        if (drawerCheckbox) drawerCheckbox.checked = false;
    };
    return (
        <div>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer"
                        className="btn btn-ghost drawer-button btn-xs">
                            <LuPanelLeftOpen className='text-2xl opacity-70' />
                        </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-[#262626] text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        {/* <li><Link href={'/'} onClick={handleClose}>Go to home</Link></li> */}
                        <Header onView = {true}/>

                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Drawer
