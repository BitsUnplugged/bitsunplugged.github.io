import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Zoom } from "@mui/material";

const CustomCard = ({ id, name, image, path, action }) => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  return (
    <Zoom in={true}>
      <div class="items-center py-4 px-4 ">
        <div class="max-w-sm  border border-gray-500 rounded-lg shadow-lg bg-gray-700 border-gray-700">
          <h5 class="mt-4 text-2xl text-center font-bold tracking-tight text-gray-900 text-white">
            {id}
          </h5>
          <h5 class="mb-4 text-3xl text-center font-bold tracking-tight text-gray-900 text-primary-500">
            {name}
          </h5>
          <img
            style={{
              width: 500,
              height: 200,
              objectFit: "cover",
            }}
            class="w-full"
            src={
              image
                ? image
                : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
            }
            alt=""
          />
          <div className="w-full flex items-center justify-center">
            <a
              onClick={() => switchPath(path)}
              class="inline-flex my-8  text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900"
            >
              <h5 class="text-lg text-center font-bold tracking-tight text-gray-900 text-white">
                {action}
              </h5>
            </a>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default CustomCard;