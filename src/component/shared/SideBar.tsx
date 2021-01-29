import React from 'react'
import cx from "classnames";
import { CloseIcon, MenuIcon } from '././svg/icons'
import { Link, NavLink } from 'react-router-dom';
import { HomeIcon } from './svg/icons';


function SideBar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <aside className="relative hidden h-screen text-gray-600 bg-white border-r shadow-xl sm:block">
            <nav className={cx("pt-3 text-base font-semibold", isOpen && " w-56")}>
                <Link to="/" onClick={() => setIsOpen(prv => !prv)} className="flex items-center pb-2 pl-1 mb-4 border-b">
                    {isOpen ? <span title="Collapse Menu"><MenuIcon /> </span> : <span title="Expand Menu"><CloseIcon /> </span>}
                </Link>

                <NavLink exact to="/" activeClassName="active-nav-link" className="flex items-center py-4 pl-4 hover:opacity-100 nav-item">
                    <span title={isOpen ? undefined : "Home"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Home</span>}
                </NavLink>
                <NavLink exact to="/profile/1" activeClassName="active-nav-link" className="flex items-center py-4 pl-4 hover:opacity-100 nav-item">
                    <span title={isOpen ? undefined : "Profile"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Profile</span>}
                </NavLink>
                <NavLink exact to="/users" activeClassName="active-nav-link" className="flex items-center py-4 pl-4 hover:opacity-100 nav-item">
                    <span title={isOpen ? undefined : "Users"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Users</span>}
                </NavLink>
                <NavLink exact to="/accounts" activeClassName="active-nav-link" className="flex items-center py-4 pl-4 hover:opacity-100 nav-item">
                    <span title={isOpen ? undefined : "Accounts"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Accounts</span>}
                </NavLink>
                <NavLink exact to="/change-password" activeClassName="active-nav-link" className="flex items-center py-4 pl-4 hover:opacity-100 nav-item">
                    <span title={isOpen ? undefined : "Change Password"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Change Password</span>}
                </NavLink>
            </nav>
            <Link to="/" className="absolute bottom-0 flex items-center justify-center w-full py-4 active-nav-link">
                <span title={isOpen ? undefined : "Last Item"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Last Item</span>}
            </Link>
        </aside>

    )
}

export default SideBar
