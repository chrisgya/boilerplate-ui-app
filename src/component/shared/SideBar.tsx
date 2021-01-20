import React from 'react'
import cx from "classnames";
import { AccessAlarmIcon, CloseIcon, MenuOpenIcon } from './icons'
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';


function SideBar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <aside className="relative hidden h-screen shadow-xl sm:block bg-sidebar">
            <nav className={cx("pt-3 text-base font-semibold text-white", isOpen && " w-56")}>
                <Link to="/" onClick={() => setIsOpen(prv => !prv)} className="flex items-center pb-2 pl-1 mb-4 border-b">
                    {isOpen ? <Tooltip title="Collapse Menu"><MenuOpenIcon className="ml-3" /></Tooltip> : <Tooltip title="Expand Menu"><CloseIcon className="ml-3" /></Tooltip>}
                </Link>

                <Link to="/" className="flex items-center py-4 pl-4 text-white active-nav-link nav-item">
                    {isOpen ? 'Dashboard' : <Tooltip title="menu description"><AccessAlarmIcon className="mr-3" /></Tooltip>}
                </Link>
                <Link to="/" className="flex items-center py-4 pl-4 text-white opacity-75 hover:opacity-100 nav-item">
                    {isOpen ? 'Dashboard' : <Tooltip title="menu description"><AccessAlarmIcon className="mr-3" /></Tooltip>}
                </Link>
                <Link to="/" className="flex items-center py-4 pl-4 text-white opacity-75 hover:opacity-100 nav-item">
                    {isOpen ? 'Dashboard' : <Tooltip title="menu description"><AccessAlarmIcon className="mr-3" /></Tooltip>}
                </Link>
                <Link to="/" className="flex items-center py-4 pl-4 text-white opacity-75 hover:opacity-100 nav-item">
                    {isOpen ? 'Dashboard' : <Tooltip title="menu description"><AccessAlarmIcon className="mr-3" /></Tooltip>}
                </Link>
                <Link to="/" className="flex items-center py-4 pl-4 text-white opacity-75 hover:opacity-100 nav-item">
                    {isOpen ? 'Dashboard' : <Tooltip title="menu description"><AccessAlarmIcon className="mr-3" /></Tooltip>}
                </Link>
                <Link to="/" className="flex items-center py-4 pl-4 text-white opacity-75 hover:opacity-100 nav-item">
                    {isOpen ? 'Dashboard' : <Tooltip title="menu description"><AccessAlarmIcon className="mr-3" /></Tooltip>}
                </Link>
            </nav>
            <Link to="/" className="absolute bottom-0 flex items-center justify-center w-full py-4 text-white bg-blue-600 active-nav-link">
                {isOpen ? 'Dashboard' : <Tooltip title="menu description"><AccessAlarmIcon className="mr-3" /></Tooltip>}
            </Link>
        </aside>

    )
}

export default SideBar
