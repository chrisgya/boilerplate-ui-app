import React from 'react'
import cx from "classnames";
import { CloseIcon, MenuIcon } from './svg/icons'
import { Link, NavLink } from 'react-router-dom';
import { HomeIcon } from './svg/icons';


function SideBar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <aside className="relative hidden h-screen text-gray-600 bg-white border-r shadow-xl sm:block">
            <nav className={cx("text-base font-semibold", isOpen && " w-56")}>
                <div onClick={() => setIsOpen(prv => !prv)} className="flex items-center justify-center py-2 mb-4 border-t-2 border-b-2 cursor-pointer">
                    {isOpen ? <span data-tip="Expand Menu"><CloseIcon /> </span> : <span data-tip="Collapse Menu"><MenuIcon data-tip="Collapse Menu" /> </span>}
                </div>

                <NavLink exact to="/" activeClassName="active-nav-link" className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                    <span data-tip={isOpen ? undefined : "Home"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Home</span>}
                </NavLink>
                <NavLink exact to="/profile/1" activeClassName="active-nav-link" className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                    <span data-tip={isOpen ? undefined : "Profile"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Profile</span>}
                </NavLink>
                <NavLink exact to="/users" activeClassName="active-nav-link" className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                    <span data-tip={isOpen ? undefined : "Users"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Users</span>}
                </NavLink>
                <NavLink exact to="/accounts" activeClassName="active-nav-link" className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                    <span data-tip={isOpen ? undefined : "Accounts"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Accounts</span>}
                </NavLink>
            </nav>
            <Link to="/" className="absolute bottom-0 flex items-center justify-center w-full py-4 active-nav-link">
                <span data-tip={isOpen ? undefined : "Last Item"}><HomeIcon /></span>  {isOpen && <span className="ml-2">Last Item</span>}
            </Link>
        </aside>

    )
}

export default SideBar
