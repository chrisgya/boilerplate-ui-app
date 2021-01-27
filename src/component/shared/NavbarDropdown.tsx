import React from 'react'
import { useHistory } from 'react-router-dom';
import { logout } from '../../common/utils/helper';

const NavbarDropdown = () => {
  const history = useHistory();
  const dropdownRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const navigate = (url: string) => {
    setIsOpen(prv => !prv);
    history.push(url);
  }

  const handleClickAway = (e: MouseEvent) => {
    const el: any = dropdownRef.current;
    if (el && !el.contains(e.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickAway, false);
    return () => document.removeEventListener("mousedown", handleClickAway, false);
  });

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(prv => !prv)} className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring">
        <img
          className="object-cover w-8 h-8 rounded-full"
          src="https://avatars.githubusercontent.com/u/16061821?s=400&u=aab14f5e3df367d10565ce115becc1cb2298cba3&v=4"
          alt="CG"
        />
      </button>
      {/* green dot  */}
      <div className="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping"></div>
      <div className="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3"></div>

      {/* Dropdown card  */}
      {isOpen && <div ref={dropdownRef} className="absolute z-10 mt-3 transform -translate-x-40 bg-white rounded-md shadow-lg xs:translate-x-0 min-w-max">
        <div className="flex flex-col p-4 space-y-1 font-medium border-b">
          <span className="text-gray-800">Christian Gyaban</span>
          <span className="text-sm text-gray-400">chrisgya500@gmail.com</span>
        </div>
        <ul className="flex flex-col p-2 my-2 space-y-1">
          <li>
            <span onClick={() => navigate('/change-password')} className="block px-2 py-1 transition rounded-md cursor-pointer hover:bg-gray-100">Change Password</span>
          </li>
          <li>
            <span onClick={() => navigate('/')} className="block px-2 py-1 transition rounded-md cursor-pointer hover:bg-gray-100">Another Link</span>
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