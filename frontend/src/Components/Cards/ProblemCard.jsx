import React, { useState, useEffect } from "react";
import { Label } from "react-konva";
import { useNavigate } from "react-router-dom";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../ProbSetTab";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Button, IconButton } from "@mui/material";
import ProblemController from "../../controller/problemController";
import EditIcon from "@mui/icons-material/Edit";
const problemController = new ProblemController();
export default function ProblemCard({
  id,
  idx,
  name,
  path,
  deleteAction,
  is_live,
}) {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const publishProblem = async () => {
    await problemController.publishProblem(id);
  };
  const unpublishProblem = async () => {
    await problemController.unpublishProblem(id);
  };
  return (
    <div class="items-center w-full">
      <div
        class={
          "border border-gray-500 rounded-lg shadow-lg bg-gray-700 border-gray-700 flex flex-row p-4 items-center"
        }
      >
        <h5 class="text-2xl text-center font-bold tracking-tight text-gray-900 text-white w-10%">
          {idx}
        </h5>
        <h5
          class="text-2xl md:text-3xl pl-5 font-bold tracking-tight text-gray-900 text-primary-500 w-75% cursor-pointer"
          onClick={() => switchPath(path)}
        >
          {name}
        </h5>
      </div>
    </div>
  );
}