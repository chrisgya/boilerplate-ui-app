import React from 'react'
import cx from "classnames";
import { Link, NavLink } from 'react-router-dom';
import Icon from './svg/Icon';


function SideBar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <aside className="relative hidden h-screen text-gray-600 bg-white border-r shadow-xl sm:block">
            <nav className={cx("text-base font-semibold", isOpen && " w-56")}>
                <div onClick={() => setIsOpen(prv => !prv)} className="flex items-center justify-center py-2 mb-4 border-t-2 border-b-2 cursor-pointer">
                    {isOpen ? <span data-tip="Expand Menu"><Icon icon='close' /> </span> : <span data-tip="Collapse Menu"><Icon icon='menu' data-tip="Collapse Menu" /> </span>}
                </div>

                <NavLink exact to="/" activeClassName="active-nav-link" className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                    <span data-tip={isOpen ? undefined : "Home"}><Icon icon='home' /></span>  {isOpen && <span className="ml-2">Home</span>}
                </NavLink>
                <NavLink exact to="/mgt/role" activeClassName="active-nav-link" className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                    <span data-tip={isOpen ? undefined : "Role Management"}><Icon icon='user-group' /></span>  {isOpen && <span className="ml-2">Role Mgt</span>}
                </NavLink>
                <NavLink exact to="/mgt/permission" activeClassName="active-nav-link" className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                    <span data-tip={isOpen ? undefined : "Permission Management"}><Icon icon='shield-check' /></span>  {isOpen && <span className="ml-2">Permission Mgt</span>}
                </NavLink>
                <NavLink exact to="/mgt/account" activeClassName="active-nav-link" className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                    <span data-tip={isOpen ? undefined : "Accounts Management"}><Icon icon='add-user' /></span>  {isOpen && <span className="ml-2">Accounts Mgt</span>}
                </NavLink>
            </nav>
            <Link to="/" className="absolute bottom-0 flex items-center justify-center w-full py-4 active-nav-link">
                <span data-tip={isOpen ? undefined : "Last Item"}><Icon icon='home' /></span>  {isOpen && <span className="ml-2">Last Item</span>}
            </Link>
        </aside>

    )
}

export default SideBar
