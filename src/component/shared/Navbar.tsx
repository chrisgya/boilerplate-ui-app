import React from "react";
import { Link } from "react-router-dom";
import { FacebookIcon, MenuIcon, PinterestIcon, TwitterIcon } from "./icons";

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 bg-blue-500 navbar-expand-lg">
                <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
                    <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
                        <Link to="/" className="inline-block py-2 mr-4 text-sm font-bold leading-relaxed text-white uppercase whitespace-no-wrap">
                            Chrisgya Company
                        </Link>
                        <button className="block px-3 py-1 text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
                            type="button" onClick={() => setNavbarOpen(!navbarOpen)}>
                            <MenuIcon />
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
                            <li className="nav-item">
                                <a
                                    className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                                    href="#pablo"
                                >
                                    <FacebookIcon className="text-lg text-white opacity-75 leading-lg" /><span className="ml-2">Share</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                                    href="#pablo"
                                >
                                    <TwitterIcon className="text-lg text-white opacity-75 leading-lg" /><span className="ml-2">Tweet</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                                    href="#pablo"
                                >
                                    <PinterestIcon className="text-lg text-white opacity-75 leading-lg" /><span className="ml-2">Pin</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;