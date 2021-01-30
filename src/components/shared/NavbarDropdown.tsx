import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../utils/helper';
import useMe from '../hooks/useMe';
import userSvg from './svg/user.svg';

const NavbarDropdown = () => {
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { isSuccess, data } = useMe();

  const handleClickAway = (e: MouseEvent) => {
    const el = dropdownRef.current;
    if (el && !el.contains(e.target as any)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickAway, false);
    return () => document.removeEventListener("mousedown", handleClickAway, false);
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(prv => !prv)} className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring">
        <img
          className="object-cover w-8 h-8 rounded-full"
          src={isSuccess && data?.pictureUrl ? data?.pictureUrl : userSvg}
          alt=""
        />
      </button>
      {/* green dot  */}
      <div className="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping"></div>
      <div className="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3"></div>

      {/* Dropdown card  */}
      {isOpen && <div className="absolute z-10 mt-3 transform -translate-x-40 bg-white rounded-md shadow-lg xs:translate-x-0 min-w-max">
        {isSuccess && <NavLink exact to="/profile/me" activeClassName="active-nav-link" className="flex flex-col p-4 space-y-1 font-medium border-b">
          <span className="text-gray-800">{`${data?.firstName} ${data?.lastName}`}</span>
          <span className="text-sm text-gray-400">chrisgya500@gmail.com</span>
        </NavLink>}
        <ul className="flex flex-col p-2 my-2 space-y-1">
          <li>
            <NavLink exact to="/to some where" activeClassName="active-nav-link" className="block px-2 py-1 transition rounded-md cursor-pointer hover:bg-gray-100">
              Another link
                </NavLink>
          </li>
          <li>
            <NavLink exact to="/change-password" activeClassName="active-nav-link" className="block px-2 py-1 transition rounded-md cursor-pointer hover:bg-gray-100">
              Change Password
                </NavLink>
          </li>
        </ul>
        <div className="flex items-center justify-center p-4 text-blue-700 underline border-t">
          <span className="cursor-pointer" onClick={() => logout()}>Logout</span>
        </div>
      </div>}
    </div>
  )
}

export default NavbarDropdown;