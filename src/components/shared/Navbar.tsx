import React from "react";
import { Link } from "react-router-dom";
import NavbarDropdown from './NavbarDropdown';
import Icon from "./svg/Icon";

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    return (<nav className="relative flex flex-wrap items-center justify-between px-2 py-3 text-gray-600 bg-white shadow-md">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
            <div className="relative flex justify-between w-full sm:w-auto sm:static sm:block sm:justify-start">
                <Link to="/" className="inline-block py-2 mr-4 text-sm font-bold leading-relaxed uppercase whitespace-no-wrap">
                    Chrisgya
                        </Link>
                <button className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer sm:hidden focus:outline-none"
                    type="button" onClick={() => setNavbarOpen(prv => !prv)}>
                    <Icon icon='home' />
                </button>
            </div>
            <div className={"sm:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")}>
                <ul className="flex flex-col list-none sm:flex-row sm:ml-auto">
                    <li>
                        <a
                            className="flex items-center px-3 py-2 text-xs font-bold leading-snug uppercase hover:opacity-75"
                            href="#pablo"
                        >
                            <Icon icon='home' /><span className="ml-2">Share</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex items-center px-3 py-2 text-xs font-bold leading-snug uppercase hover:opacity-75"
                            href="#pablo"
                        >
                            <Icon icon='home' /><span className="ml-2">Tweet</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex items-center px-3 py-2 text-xs font-bold leading-snug uppercase hover:opacity-75"
                            href="#pablo"
                        >
                            <Icon icon='home' /><span className="ml-2">Pin</span>
                        </a>
                    </li>

                    <li >
                        <NavbarDropdown />
                    </li>

                    {/* from sidebar in mobile view */}
                    <div className="hidden mt-5 border-t xs:block">
                        <li >
                            <a
                                className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white hover:opacity-75"
                                href="#pablo"
                            >
                                <Icon icon='home' /><span className="ml-2">Share</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white hover:opacity-75"
                                href="#pablo">
                                <Icon icon='home' /><span className="ml-2">Share</span>
                            </a>
                        </li>
                    </div>


                </ul>

            </div>

        </div>
    </nav>
    );
}

export default Navbar;