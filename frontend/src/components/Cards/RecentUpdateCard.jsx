import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading } from "../../App";
import { getTimeStamp } from "services/dateUtil";
export default function RecentUpdateCard({
  idx,
  id,
  name,
  path,
  action,

  last_updated,
}) {
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full" key={id}>
      <div
        className={
          "border rounded-lg shadow-md bg-gray-700 bu-card-primary flex flex-col p-5 h-full"
        }
      >
        {/* <h5 className="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5> */}

        <div className="flex flex-row cursor-pointer">
          <h5
            className="text-xl md:text-2xl tracking-tight bu-text-primary w-[35%] cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full"
            onClick={() => {
              setLoading(true);
              navigate(path);
            }}
          >
            {name}
          </h5>
          
          <div className="text-center w-[40%] text-xl bu-text-primary">
            {getTimeStamp(last_updated)}
          </div>
        </div>
      </div>
    </div>
  );
}