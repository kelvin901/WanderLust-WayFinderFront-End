import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { useAuth } from '../AuthContext';
import Container from './Container';
import { logo } from '../assets/home';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMobileMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  const handleAdminClick = () => {
    setIsOpen(false);
    navigate('/admin');
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  return (
    <nav className="py-2 z-40">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-4 items-center">
            <img className="h-[80px] w-[80px]" src={logo} alt="Workflow" />
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                {user && (
                  <>
                    <Link
                      to="/explore"
                      className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Explore
                    </Link>
                    <Link
                      to="/about"
                      className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Contact
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            {user ? (
              <div className="hidden md:block">
                <div className="flex items-center gap-4">
                  {/* Display the user's username */}
                  {user.admin && (
                    <button
                      onClick={handleAdminClick}
                      className="hover:bg-button-primary px-4 py-1 rounded-xl"
                    >
                      Admin
                    </button>
                  )}
                  {/* <button
                    onClick={handleProfileClick}
                    className="hover:bg-button-primary px-4 py-1 rounded-xl"
                  >
                    {user.username}
                  </button> */}
                  {/* Display the user's avatar */}
                  <Image
                   onClick={handleProfileClick}
                    cloudName="db4tmeuux" // Replace with your Cloudinary cloud_name
                    publicId={user.avatar || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                    width="48"
                    height="48"
                    border="solid blue"
                    crop="thumb"
                    className="rounded-full"
                    style= {{cursor:"pointer"}}
                  />
                  <button
                    onClick={logout}
                    className="hover:bg-button-primary px-4 py-1 rounded-xl"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/signup">
                  <div className="hidden md:block hover:bg-button-primary px-4 py-1 rounded-xl">
                    Register
                  </div>
                </Link>
                <Link to="/login">
                  <div className="hidden md:block hover:bg-button-primary px-4 py-1 rounded-xl">
                    Login
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* MOBILE VIEW */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={handleMobileMenuToggle}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {isOpen && (
  <div className="md:hidden transition-all" id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-black">
      <Link
        to="/"
        onClick={handleMobileLinkClick}
        className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        Home
      </Link>
      {user && (
        <>
          <Link
            to="/explore"
            onClick={handleMobileLinkClick}
            className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Explore
          </Link>
          <Link
            to="/about"
            onClick={handleMobileLinkClick}
            className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={handleMobileLinkClick}
            className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
          <div className="flex items-center gap-4">
            
              <Image
              onClick={handleProfileClick}
                cloudName="db4tmeuux" // Replace with your Cloudinary cloud_name
                publicId={user.avatar || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                width="48"
                height="48"
                border="solid blue"
                crop="thumb"
                className="rounded-full"
                style={{cursor: "pointer"}}
              />
        
            {user.admin && (
              <button
                onClick={handleAdminClick}
                className="hover:bg-button-primary px-4 py-1 rounded-xl"
              >
                Admin
              </button>
            )}
            <button
              onClick={logout}
              className="hover:bg-button-primary px-4 py-1 rounded-xl"
            >
              Logout
            </button>
          </div>
        </>
      )}
      {!user && (
        <>
          <Link
            to="/signup"
            onClick={handleMobileLinkClick}
            className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Register
          </Link>
          <Link
            to="/login"
            onClick={handleMobileLinkClick}
            className="hover:bg-primary-base hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </Link>
        </>
      )}
    </div>
  </div>
)}

      </Container>
    </nav>
  );
}

export default Navbar;
