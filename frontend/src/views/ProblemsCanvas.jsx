import React, { forwardRef, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CanvasContainer from "../components/Canvases/CanvasContainer";
import { Button, IconButton, Tooltip } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SendIcon from "@mui/icons-material/Send";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../App";
import "katex/dist/katex.css";
import MarkdownPreview from "../components/Markdown/MarkdownPreview";
import { useProblemContext } from "../store/ProblemContextProvider";
import {
	faCamera,
	faCameraRetro,
	faCode,
	faObjectGroup,
	faPlay,
	faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import { storageApi } from "api";
import CanvasPreview from "pages/CanvasPreview";
import StatementPreview from "components/StatementPreview";
const Title = ({ problem }) => {
	return (
		<div className="flex max-w-screen-xl flex-col gap-3 py-4 sm:pt-12">
			<div className="mt-4 md:mt-0">
				<h2 className="text-left text-5xl font-extrabold tracking-tight ">
					<span className="bu-text-title">{problem.title}</span>
				</h2>
			</div>
			<span className="bu-text-subtitle text-xl">
				{problem && problem.series
					? problem?.series?.topic?.name +
						" > " +
						problem?.series?.name
					: ""}
			</span>
		</div>
	);
};

const Header = ({ type }) => {
	const navigate = useNavigate();
	const { state: problem, dispatch } = useProblemContext();
	return (
		<div className="flex flex-row justify-between">
			<Title problem={problem} />
			{type != 0 ? (
				<div className="flex items-center">
					<Tooltip
						title={<h1 className="text-lg text-white">Edit</h1>}
						placement="top"
						arrow
						size="large"
					>
						<IconButton>
							<div
								data-tooltip-target="tooltip-default"
								className="bu-text-primary flex cursor-pointer items-center text-4xl"
								onClick={() => {
									setLoading(true);
									navigate(
										type == 2
											? `/admin/problems/${problem.id}`
											: `/problems/${problem.id}/edit`
									);
								}}
							>
								<FontAwesomeIcon icon={faPenToSquare} />
							</div>
						</IconButton>
					</Tooltip>
				</div>
			) : (
				<div className="flex items-center">
					<button
						className="bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
						onClick={() => {
							setLoading(true);
							console.log(problem);
							navigate(`/submissions/${problem.id}`);
						}}
					>
						<div className="flex flex-row items-center gap-4">
							SUBMISSIONS
						</div>
					</button>
				</div>
			)}
		</div>
	);
};

// const Statement = ({ colorMode }) => {
//   const { state: problem, dispatch } = useProblemContext();
//   return (
//     <div className="mx-auto max-w-screen-2xl items-center">
//       <div className="bu-text-primary  text-left font-light md:text-lg">
//         <div
//           style={{
//             width: "100%",
//             paddingTop: "20px",
//             fontSize: "25px",
//             border: "none",
//             borderRadius: "20px",
//           }}
//         >
//           <MarkdownPreview
//             colorMode={colorMode}
//             text={problem.statement ?? ""}
//             customStyle={{ padding: "20px" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const Canvas = forwardRef(({ onReset, onSubmit }, ref) => {
//   const { state: problem, dispatch } = useProblemContext();
//   const stageRef = useRef(null);
//   const saveCanvasAsImage = async () => {
//     const stage = stageRef.current;

//     // check if the stage is canvas or canvas = await html2canvas(element), then use canvas.toDataURL()
//     let image;
//     try {
//       image = stage.toDataURL();
//     } catch (error) {
//       const canvas = await html2canvas(stage, { backgroundColor: null });
//       image = canvas.toDataURL("image/png");
//     }

//     // Create a temporary link element
//     const link = document.createElement("a");
//     link.href = image;
//     link.download = "canvas_image.png";

//     // Trigger the download
//     document.body.appendChild(link);
//     link.click();

//     // Clean up
//     document.body.removeChild(link);
//   };

//   const canvasToImage = async () => {
//     // Convert canvas to image file
//     // Then send the image file to the server
//     // Then get the response from the server
//     // Then return the link to the image
//     const stage = stageRef.current;
//     let image;
//     try {
//       image = stage.toDataURL();
//     } catch (error) {
//       const canvas = await html2canvas(stage, { backgroundColor: null });
//       image = canvas.toDataURL("image/png");
//     }
//     const response = await fetch(image);
//     const blob = await response.blob();

//     // Create FormData
//     const formData = new FormData();
//     formData.append("file", blob, "canvas_image.png");

//     const res = await storageApi.trimmedUpload(formData);
//     if (res.success) {
//       return res.data.path;
//     } else {
//       return null;
//     }
//   };

//   return (
//     problem.canvasId &&
//     ref && (
//       <div className="flex w-full flex-col">
//         <CanvasContainer
//           canvasId={problem.canvasId}
//           input={problem.canvasData}
//           setInput={(dataOrFunction) => {
//             dispatch((prevState) => {
//               return {
//                 type: "UPDATE_TEST_CANVAS",
//                 payload:
//                   typeof dataOrFunction === "function"
//                     ? dataOrFunction(prevState.test)
//                     : dataOrFunction,
//               };
//             });
//           }}
//           mode={"preview"}
//           ref={ref}
//           editOptions={problem.editOptions}
//           previewOptions={problem.previewOptions}
//           activityData={problem.activityData}
//           setActivityData={(data) => {
//             dispatch({
//               type: "UPDATE_TEST_ACTIVITY",
//               payload: { ...data },
//             });
//           }}
//           stageRef={stageRef}
//         />
//         <div className=" rounded-full w-80 mx-auto h-12 flex items-center justify-between gap-1 my-4">
//           <div
//             className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-l-full text-2xl"
//             onClick={onReset}
//           >
//             {/* <RotateLeftIcon /> */}
//             <FontAwesomeIcon icon={faRotateRight} />
//           </div>

//           <div
//             className="flex gap-2 items-center justify-center bu-button-secondary w-full h-full text-2xl "
//             onClick={async () => onSubmit(await canvasToImage())}
//           >
//             <FontAwesomeIcon icon={faPlay} />
//             {/* RUN */}
//           </div>
//           <div
//             className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
//             onClick={saveCanvasAsImage}
//           >
//             {/* SAVE */}
//             <FontAwesomeIcon icon={faCameraRetro} />
//           </div>
//         </div>
//       </div>
//     )
//   );
// });

const ProblemsCanvasView = ({ onSubmit, onReset, colorMode, type }, ref) => {
	const { state: problem, dispatch } = useProblemContext();
	return (
		<div>
			{problem && (
				<div className="flex flex-col gap-5">
					<div>
						<Header type={type} />
						<StatementPreview
							statement={problem.statement}
							colorMode={colorMode}
						/>
					</div>
					<CanvasPreview
						ref={ref}
						onSubmit={onSubmit}
						takeSnapshot={true}
						giveHint={true}
					/>
				</div>
			)}
		</div>
	);
};

export default forwardRef(ProblemsCanvasView);
