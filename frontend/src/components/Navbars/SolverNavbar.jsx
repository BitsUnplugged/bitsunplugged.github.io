import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, InputAdornment, Typography } from "@mui/material";
import Logo from "../Logo";
import SearchBar from "../InputFields/SearchBar";
import SearchModal from "../Modal/SearchModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faChalkboardUser,
  faHeadSideVirus,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../../App";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { profileApi } from "../../api";
import AuthService from "../../services/authService";
import GlobalContext from "../../store/GlobalContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavButton from "./NavButton";
import { Search } from "lucide-react";
import { set } from "date-fns";

const SolverNavbar = (props) => {
  const [user, setUser] = useState(null);
  const { type, setType, setColorMode } = useContext(GlobalContext);
  const [search, setSearch] = useState(false);
  const [seachQuery, setSeachQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const searchSubmit = async () => {
    const isLoggedIn = localStorage.hasOwnProperty("token");
    if (isLoggedIn) {
      const res = await profileApi.searchProfileByQuery(seachQuery);
      if (res.success) {
        setUserList(res.data);
        console.log(res.data);
        // break;
      } else {
        // navigate("/login");
      }
    }
  };

  const searchUser = async (user) => {
    setIsModalOpen(false);
    setSeachQuery("");

    if (user.role === 0) {
      navigate("/user/" + user.username);
    } else {
      navigate("/setter/" + user.username);
    }
  };

  const setProfile = async () => {
    const isLoggedIn = localStorage.hasOwnProperty("token");
    if (isLoggedIn) {
      const res = await profileApi.getProfile();
      if (res.success) {
        setUser(res.data[0]);
        // break;
      } else {
        // navigate("/login");
      }
    }
  };

  const [darkMode, setDarkMode] = useState(null);

  const toggleDarkMode = () => {
    setColorMode(darkMode ? "light" : "dark");
    setDarkMode((prevDarkMode) => !prevDarkMode);
    // setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    if (darkMode != null) {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        window.dispatchEvent(new Event("storage"));
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        window.dispatchEvent(new Event("storage"));
      }
    }
  }, [darkMode]);

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setProfile();

    if (localStorage.getItem("color-theme") === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [localStorage]);

  useEffect(() => {
    console.log("modal open");
    setIsModalOpen(true);
  }, [userList]);

  return (
    <>
      {type >= 0 && (
        <div className="bu-nav-color  flex flex-row w-full justify-between md:justify-center">
          <div className="hidden md:flex h-20 w-1/5 items-center px-5">
            <div
              className={`p-5 pl-0 transition-all duration-300 ease-in-out cursor-pointer ${
                !search ? "opacity-100" : "opacity-0 hidden"
              }`}
              onClick={() => {
                setLoading(true);
                navigate("/landing");
              }}
            >
              <Logo width={180} height={45} />
            </div>

            <SearchBar
              searchQuery={seachQuery}
              setSearchQuery={setSeachQuery}
              label={"user name"}
              setSearch={setSearch}
              onSubmit={searchSubmit}
            />
          </div>
          <div className="flex justify-start md:justify-center w-8/12 md:w-3/5">
            <>
              <NavButton
                label={
                  <>
                    <FontAwesomeIcon icon={faHouse} />
                    Home
                  </>
                }
                path="/home"
              />
              <NavButton
                label={
                  <>
                    <FontAwesomeIcon icon={faChalkboardUser} />
                    Learn
                  </>
                }
                path="/topics"
              />
              <NavButton
                label={
                  <>
                    <FontAwesomeIcon icon={faHeadSideVirus} />
                    Practice
                  </>
                }
                path="/practice"
              />
              <NavButton
                label={
                  <>
                    <FontAwesomeIcon icon={faTrello} />
                    Compete
                  </>
                }
                path="/contests"
              />
            </>
          </div>
          <div className="flex md:flex h-20 w-1/3 md:w-1/5 items-center justify-end">
            <div className="flex h-20 w-1/3 md:w-1/5 items-center justify-center">
              <div
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                onClick={() => toggleDarkMode()}
              >
                <svg
                  id="theme-toggle-dark-icon"
                  className={`w-5 h-5 ${darkMode ? "block" : "hidden"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg
                  id="theme-toggle-light-icon"
                  className={`w-5 h-5 ${darkMode ? "hidden" : "block"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div> 
            <div className="flex md:flex items-center justify-center w-3/5 md:w-1/3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar
                    alt="blah"
                    src={
                      user != null
                        ? user.image
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
                    }
                    className="cursor-pointer"
                    // onClick={() => {
                    //   setLoading(true);
                    //   type == 0
                    //     ? navigate("/user/" + user.username)
                    //     : navigate("/setter/" + user.username);
                    // }}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 p-2 mt-5 mr-1">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        setLoading(true);
                        type == 0
                          ? navigate("/user/" + user.username)
                          : navigate("/setter/" + user.username);
                      }}
                    >
                      Profile
                      {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                      {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        Invite users
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Email</DropdownMenuItem>
                          <DropdownMenuItem>Message</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                      New Team
                      {/* <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem disabled>API</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      setLoading(true);
                      await AuthService.logout();
                      setType(0);
                      navigate("/login");
                    }}
                  >
                    Log out
                    {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && userList.length > 0 ? (
        <SearchModal
          label={"Search Results"}
          list={userList}
          onSearch={searchUser}
          onClose={() => setIsModalOpen(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SolverNavbar;
