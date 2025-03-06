import React, { forwardRef, useRef, useState } from "react";
import CanvasContainer from "../components/Canvases/CanvasContainer";
import { useProblemContext } from "../store/ProblemContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import SubmissionService from "services/submissionService";
import { IconButton, Tooltip } from "@mui/material";
import { InfoIcon } from "lucide-react";
import { Cancel, Lightbulb, TipsAndUpdates } from "@mui/icons-material";
const deepCopy = (obj) => {
	return typeof obj === "string"
		? JSON.parse(obj)
		: JSON.parse(JSON.stringify(obj));
};

const CanvasPreview = ({ preview, onSubmit, takeSnapshot, giveHint }, ref) => {
	const { state: problem, dispatch } = useProblemContext();
	const [isHintOpen, setIsHintOpen] = useState(false);
	const [previousHints, setPreviousHints] = useState([]);
	const [currentHint, setCurrentHint] = useState(
		"Sayem Hint Dao. Pleeeease."
	);

	const stageRef = useRef(null);

	const getHint = () => {
		const prompt = {
			statement: problem.statement,
			previousHints: previousHints,
			userCanvas: problem.test,
			solutionCanvas: problem.checkerCanvas,
			userActivity: problem.testActivity,
			solutionCheckerCode: problem.checkerCode,
		};
		console.log(prompt);
		setCurrentHint("Loading...");
		setIsHintOpen(true);
	};
	const onClose = () => {
		setIsHintOpen(false);
		setPreviousHints([...previousHints, currentHint]);
	};

	const solutionSubmit = async () => {
		if (preview) return;
		console.log(problem.checkerCanvas, problem.test, problem.testActivity);
		let res = await SubmissionService.checkSolution(
			problem.checkerCode,
			problem.checkerCanvas,
			problem.test,
			problem.testActivity
		);
		takeSnapshot
			? onSubmit(res.output, await canvasToImage())
			: onSubmit(res.output);
	};

	const saveCanvasAsImage = async () => {
		const stage = stageRef.current;

		// check if the stage is canvas or canvas = await html2canvas(element), then use canvas.toDataURL()
		let image;
		try {
			image = stage.toDataURL();
		} catch (error) {
			const canvas = await html2canvas(stage, { backgroundColor: null });
			image = canvas.toDataURL("image/png");
		}

		// Create a temporary link element
		const link = document.createElement("a");
		link.href = image;
		link.download = "canvas_image.png";

		// Trigger the download
		document.body.appendChild(link);
		link.click();

		// Clean up
		document.body.removeChild(link);
	};
	const canvasToImage = async () => {
		// Convert canvas to image file
		// Then send the image file to the server
		// Then get the response from the server
		// Then return the link to the image
		const stage = stageRef.current;
		let image;
		try {
			image = stage.toDataURL();
		} catch (error) {
			const canvas = await html2canvas(stage, { backgroundColor: null });
			image = canvas.toDataURL("image/png");
		}
		const response = await fetch(image);
		const blob = await response.blob();

		// Create FormData
		const formData = new FormData();
		formData.append("file", blob, "canvas_image.png");

		const res = await storageApi.trimmedUpload(formData);
		if (res.success) {
			return res.data.path;
		} else {
			return null;
		}
	};
	return (
		ref && (
			<div className="relative rounded-[30px] pb-[0.25rem] bg-[#fbfbfb]">
				<CanvasContainer
					canvasId={problem.canvasId}
					input={problem.test}
					setInput={(dataOrFunction) => {
						dispatch((prevState) => {
							return {
								type: "UPDATE_TEST_CANVAS",
								payload:
									typeof dataOrFunction === "function"
										? dataOrFunction(prevState.test)
										: dataOrFunction,
							};
						});
					}}
					activityData={problem.testActivity}
					setActivityData={(data) => {
						dispatch({
							type: "UPDATE_TEST_ACTIVITY",
							payload: { ...data },
						});
					}}
					ref={ref}
					mode="preview"
					previewOptions={problem.previewOptions}
					editOptions={problem.editOptions}
					stageRef={stageRef}
				/>
				<div className="w-full h-[.2rem] bg-gray-200"></div>
				<div className="rounded-full w-80 mx-auto h-12 flex items-center justify-between gap-1 my-4">
					<div
						className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-l-full text-2xl"
						onClick={() => {
							dispatch({
								type: "SET_TEST_CANVAS",
								payload: deepCopy(problem.canvasData),
							});
							ref?.current.handleReset(
								deepCopy(problem.canvasData)
							); // Call this after reset
						}}
					>
						{/* <RotateLeftIcon /> */}
						<FontAwesomeIcon icon={faRotateRight} />
					</div>

					<div
						className="flex gap-2 items-center justify-center bu-button-secondary w-full h-full text-2xl "
						onClick={solutionSubmit}
					>
						<FontAwesomeIcon icon={faPlay} />
						{/* RUN */}
					</div>
					<div
						className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
						onClick={saveCanvasAsImage}
					>
						{/* SAVE */}
						<FontAwesomeIcon icon={faCameraRetro} />
					</div>
				</div>
				{giveHint && (
					<div className="absolute h-[85px] right-0 bottom-0 flex items-center p-2">
						<Tooltip
							title={
								<h1 className="text-lg text-white">Hints</h1>
							}
							placement="top"
							// TransitionComponent={Zoom}
							arrow
							size="large"
						>
							<div className="flex flex-col items-center bu-text-primary font-bold">
								<IconButton
									sx={{
										fontSize: "2rem",
										width: "3rem",
										height: "3rem",
									}}
									onClick={getHint}
								>
									<div className="flex items-center bu-text-primary">
										<Lightbulb sx={{ fontSize: "2rem" }} />
									</div>
								</IconButton>
								<div className="transform translate-y-[-50%] text-sm">
									Hint
								</div>
							</div>
						</Tooltip>
						{isHintOpen && (
							<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
								<div className="rounded-lg shadow-md p-[10px] text-center relative bu-nav-color w-[300px]">
									{/* <button
									onClick={onClose}
									className="absolute top-3 right-3 bu-text-primary"
								>
									<Cancel />
								</button> */}
									<div className="p-5">
										<h2 className="bu-text-primary mb-[10px] text-xl font-semibold">
											{currentHint}
										</h2>
										<div>
											<button
												onClick={onClose}
												className="font-medium rounded-lg text-lg px-7 py-2 text-center w-full bu-button-primary"
											>
												Continue
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		)
	);
};

export default forwardRef(CanvasPreview);
