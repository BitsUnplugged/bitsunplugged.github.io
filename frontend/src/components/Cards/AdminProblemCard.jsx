import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading } from "../../App";
import { problemApi } from "../../api";
import Confirmation from "../Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faCircleCheck,
  // faCircleXmark,
  faR,
  faTag,
  fas,
  fa,
  faS,
  faTrashCan,
  // far,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { IconButton } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AddTask from "@mui/icons-material/AddTask";
export default function ProblemCard({
  id,
  name,
  path,
  deleteAction,
  isLive,
  setProblem,
  isEdit,
}) {
  const [open, setOpen] = useState(false);
  const [acceptance, setAcceptance] = useState(Math.round(Math.random() * 100));
  const [difficulty, setDifficulty] = useState(
    ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)]
  );
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  const publishProblem = async () => {
    await problemApi.publishProblem(id);
  };
  const unpublishProblem = async () => {
    await problemApi.unpublishProblem(id);
  };
  return (
    <div className="w-full h-full" key={id}>
      <div
        className={`border rounded-lg bg-gray-700 bu-card-primary flex flex-col p-5 h-full ${
          isLive ? "shadow-md" : "opacity-60"
        }`}
      >
        {/* <h5 className="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5> */}

        <div className="flex flex-row cursor-pointer items-center">
          <h5
            className="text-xl md:text-2xl tracking-tight bu-text-primary w-[45%] cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full"
            onClick={() => {
              //   setLoading(true);
              //   navigate(path);
            }}
          >
            {name}
          </h5>
          <h3
            className={`text-center w-[20%] text-lg ${
              acceptance > 70
                ? "text-green-500 font-sm"
                : acceptance > 40
                  ? "text-[#FF981E] font-medium"
                  : "text-red-500 font-bold"
            }`}
          >
            {acceptance}%
          </h3>

          <h3
            className={`text-center w-[20%] text-lg ${
              difficulty === "Medium"
                ? "text-[#FF981E] font-medium"
                : difficulty === "Easy"
                  ? "text-green-500 font-sm"
                  : "text-red-500 font-extrabold"
            }`}
          >
            {difficulty}
          </h3>
          {isEdit && (
            <div className="flex flex-row justify-center w-[15%]">
              <div className="w-1/3 flex items-center justify-center">
                {isLive ? (
                  <IconButton
                    onClick={async () => {
                      // await topicApi.updateTopic(id, { isLive: false });
                      setProblem(id, { isLive: false });
                    }}
                  >
                    <div className="flex items-center bu-text-primary">
                      <CheckCircle sx={{ fontSize: "1.5rem" }} />
                    </div>
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={async () => {
                      // await topicApi.updateTopic(id, { isLive: true });
                      setProblem(id, { isLive: true });
                    }}
                  >
                    <div className="flex items-center bu-text-subtitle">
                      <AddTask sx={{ fontSize: "1.5rem" }} />
                    </div>
                  </IconButton>
                )}
              </div>

              <div className="w-1/3 flex items-center justify-center">
                <IconButton onClick={() => setOpen(true)}>
                  <div className="flex items-center bu-text-primary">
                    <FontAwesomeIcon icon={faTrashCan} size="sm" />
                  </div>
                </IconButton>
              </div>
            </div>
          )}
        </div>
      </div>
      <Confirmation
        open={open}
        setOpen={setOpen}
        onConfirm={deleteAction}
        param={id}
      />
    </div>
  );
}