import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { setLoading } from "../../../App";
import { problemApi } from "../../../api";
import ProblemContextProvider, {
  useProblemContext,
} from "../../../store/ProblemContextProvider";
import ProbSetTab from "../../../components/ProbSetTab";
import Confirmation from "../../../components/Confirmation";
import TestTab from "./TestTab";
import SolutionCheckerTab from "./SolutionCheckerTab";
import CanvasDesignTab from "./CanvasDesignTab";
import DetailsTab from "./DetailsTab";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ProblemSetEnvView = () => {
  const backupProblem = useRef(null);
  const { problemid } = useParams(); // problem.id
  const [isFormDirty, setFormDirty] = useState(false); // pending
  const [open, setOpen] = useState(false); // decouple
  const navigate = useNavigate();
  const { state: problem, dispatch } = useProblemContext();
  const [activeComponent, setActiveComponent] = useState("Details"); // not related to database
  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  const testRef = useRef(null);
  const deleteProblem = async () => {
    const res = await problemApi.deleteProblem(problem.id);
    if (res.success) {
      navigate("/problemSet");
    }
  };

  const getProblem = async () => {
    const res = await problemApi.getProblemById(problemid);
    console.log(problemid);
    if (res.success) {
      backupProblem.current = res.data;
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: JSON.parse(
          JSON.stringify({
            ...res.data,
            test: null,
            testActivity: {},
            checkerCanvas: res.data.checkerCanvas ?? res.data.canvasData,
          })
        ),
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  useEffect(() => {
    if (problemid != undefined) {
      getProblem();
    }
  }, [problemid]);

  return (
    <div>
      <Header backupProblem={backupProblem} />
      <ProbSetTab
        activeTab={activeComponent}
        click={(tab) => {
          if (tab === "Test" && activeComponent !== "Test") {
            dispatch({
              type: "UPDATE_TEST_CANVAS",
              payload: deepCopy(problem.canvasData),
            });
            testRef?.current?.handleReset(deepCopy(problem.canvasData));
          }
          setActiveComponent(tab);
          // document.body.style.cursor = "default";
        }}
      />

      <div className="component-container relative">
        <div
          className={
            "mt-5 flex flex-col gap-5 " +
            (activeComponent === "Details" ? "block" : "hidden")
          }
        >
          <DetailsTab />
        </div>
        <div className={activeComponent === "Canvas" ? "block" : "hidden"}>
          <CanvasDesignTab backupProblem={backupProblem} />
        </div>
        <div className={activeComponent === "Solution" ? "block" : "hidden"}>
          <SolutionCheckerTab />
        </div>
        <div className={activeComponent === "Test" ? "block" : "hidden"}>
          <TestTab ref={testRef} />
        </div>
      </div>
      <Confirmation open={open} setOpen={setOpen} onConfirm={deleteProblem} />
    </div>
  );
};
const ProblemSetEnv = () => {
  return (
    <ProblemContextProvider>
      <DndProvider backend={HTML5Backend}>
        <ProblemSetEnvView />
      </DndProvider>
    </ProblemContextProvider>
  );
};
export default ProblemSetEnv;