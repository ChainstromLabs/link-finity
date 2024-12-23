import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useIsAuthenticated, useAuthType } from '../auth/authguard';
import AuthWallet from "../auth/auth";
import { NavLink } from "react-router-dom";

import logo from '../../assets/linkfintyasset/logo.png';
import icp from '../../assets/linkfintyasset/icp.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const [isModalOpenProfiles, setIsModalOpenProfiles] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openProfile = () => {
    setIsModalOpenProfiles(true);
    console.log("test");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const isAuthenticated = useIsAuthenticated();
  const authType = useAuthType();
  const [activeTab, setActiveTab] = useState("Discover");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Dashboard") navigate("/app");
    else if (tab === "Explore") navigate("/explore");
    else if (tab === "Templates") navigate("/template");
    else if (tab === "Analytics") navigate("/analytics");
  };

  const getClassNames = (tab: string) => {
    return activeTab === tab
      ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <nav className="bg-drak-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img className="h-8 w-auto" src={logo} alt="Your Company" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {isAuthenticated ? (
                  <>
                    <NavLink
                      to="/app"
                      className={({ isActive }) =>
                        isActive
                          ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                          : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    >
                      <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                    </NavLink>

                    <NavLink
                      to="/analytics"
                      className={({ isActive }) =>
                        isActive
                          ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                          : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    >
                      <i className="fas fa-chart-bar mr-2"></i> Analytics
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to="/app"
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    <i className="fas fa-compass mr-2"></i> Discover
                  </NavLink>
                )}

                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                >
                  <i className="fas fa-search mr-2"></i> Explore
                </NavLink>

                <NavLink
                  to="/template"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                >
                  <i className="fas fa-file-alt mr-2"></i> Templates
                </NavLink>
              </div>
            </div>
          </div>

          {/* User Profile Button */}
          {isAuthenticated ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* User Profile Menu */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={toggleMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={icp}
                      alt="User Avatar"
                    />
                  </button>
                </div>
                {isMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <AuthWallet
                      isModalOpenProfile={isModalOpenProfiles}
                      setIsModalOpenProfile={setIsModalOpenProfiles}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <AuthWallet
                isModalOpenProfile={isModalOpenProfiles}
                setIsModalOpenProfile={setIsModalOpenProfiles}
              />
            </div>
          )}
        </div>


      </div>

      {/* Mobile Menu */}
      <div
    className={`${
      isMenuOpen ? "block" : "hidden"
    } sm:hidden `}
    id="mobile-menu"
  >
    <div className="space-y-1 px-2 pb-3 pt-2">
      <NavLink
        to="/explore"
        className={({ isActive }) =>
          isActive
            ? "block rounded-md px-3 py-2 text-base font-medium text-white bg-gray-900"
            : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        }
      >
        Explore
      </NavLink>
      <NavLink
        to="/template"
        className={({ isActive }) =>
          isActive
            ? "block rounded-md px-3 py-2 text-base font-medium text-white bg-gray-900"
            : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        }
      >
        Templates
      </NavLink>
    </div>
  </div>

      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin h-12 w-12 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              d="M4 12a8 8 0 0116 0"
              fill="none"
            />
          </svg>
        </div>
      )}

    </nav>
  );
}
