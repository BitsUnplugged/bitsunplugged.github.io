import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
const AdminNavButton = ({ label, path }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <button
      className={`flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-30 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info items-center justify-center border-b-4 ${
        location.pathname === path
          ? "border-[#1C5B5F] dark:border-pink-500"
          : "border-transparent"
      }`}
      data-tip="Home"
      onClick={() => {
        if (location.pathname !== path) {
          setLoading(true);
          navigate(path);
        }
      }}
    >
      <div
        className={`text-xs md:text-lg md:font-bold  flex flex-row items-center gap-3 ${
          location.pathname === path ? "bu-text-title" : "bu-text-primary-hover"
        }`}
      >
        {label}
      </div>
      <div className="divider hidden md:flex "></div>
    </button>
  );
};

export default AdminNavButton;