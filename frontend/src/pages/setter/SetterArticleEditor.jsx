import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articleApi, storageApi } from "../../api";
import { setLoading, showSuccess } from "../../App";
import { useGlobalContext } from "store/GlobalContextProvider";
import Title from "../../components/Title";

import {
	faAdd,
	faArrowLeft,
	faArrowRight,
	faArrowUpRightFromSquare,
	faFloppyDisk,
	faPlay,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CanvasContainer from "components/Canvases/CanvasContainer";
import { Button } from "react-day-picker";
import { SendIcon } from "lucide-react";
import { RotateLeft } from "@mui/icons-material";
import ProblemContextProvider, {
	useProblemContext,
} from "store/ProblemContextProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ProbSetTab from "../ProbSetTab";
import CanvasDesignTab from "../CanvasDesignTab";
import SolutionCheckerTab from "../SolutionCheckerTab";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import ImageLoader from "components/ImageLoaders/ImageLoader";
import CanvasPreview from "pages/CanvasPreview";
import SubmissionService from "services/submissionService";
import MarkDownContainer from "pages/admin/MarkDownContainer";

const ArticleCanvas = ({ data, articleId, content, index }) => {
	const { state: problem, dispatch } = useProblemContext();
	const navigate = useNavigate();
	const backupProblem = useRef(null);
	const [activeComponent, setActiveComponent] = useState("Canvas"); // not related to database
	const testRef = useRef(null);
	const deepCopy = (obj) => {
		return obj == null
			? null
			: typeof obj === "string"
				? JSON.parse(obj)
				: JSON.parse(JSON.stringify(obj));
	};

	const getProblem = async () => {
		backupProblem.current = data;
		dispatch({
			type: "SET_INITIAL_STATE",
			payload: deepCopy({
				...data,
				test: null,
				testActivity: {},
				checkerCanvas: deepCopy(data.checkerCanvas ?? data.canvasData),
				canvasData: deepCopy(data.canvasData),
				editOptions: deepCopy(data.editOptions),
				previewOptions: deepCopy(data.previewOptions),
			}),
		});
	};

	const onSubmit = async () => {
		await SubmissionService.checkSolution(
			problem.checkerCode,
			problem.checkerCanvas,
			problem.test,
			problem.testActivity
		);
	};
	const updateCanvas = async () => {
		console.log("UPDATE CANVAS  ");
		dispatch({
			type: "UPDATE_CHECKER_CANVAS",
			payload: deepCopy(problem.canvasData),
		});

		backupProblem.current.canvasData = deepCopy(problem.canvasData);
		const newContent = [...content];
		newContent[index] = {
			...newContent[index],
			canvasId: problem.canvasId,
			canvasData: problem.canvasData,
			editOptions: problem.editOptions,
			previewOptions: problem.previewOptions,
			checkerCode: problem.checkerCode,
			checkerCanvas: problem.checkerCanvas,
		};
		const res = await articleApi.updateArticle(articleId, {
			content: newContent,
		});
		if (res.success) {
			// console.log(res);
			showSuccess("Canvas saved successfully", res);
		}
	};

	const updateSolutionChecker = async (checkerType) => {
		if (checkerType == 0 && problem.checkerCode == null) return;
		if (checkerType == 1 && problem.checkerCanvas == null) return;
		const newContent = [...content];
		newContent[index] = {
			...newContent[index],
			...(checkerType == 0 && {
				checkerCode: problem.checkerCode,
			}),
			...(checkerType == 1 && {
				checkerCanvas: problem.checkerCanvas,
			}),
		};
		const res = await articleApi.updateArticle(articleId, {
			content: newContent,
		});
		if (res.success) {
			showSuccess("Checker saved successfully", res);
		}
	};

	useEffect(() => {
		getProblem();
	}, []);
	return (
		<div>
			{/* <Header backupProblem={backupProblem} /> */}
			<ProbSetTab
				activeTab={activeComponent}
				click={(tab) => {
					if (tab === "Test" && activeComponent !== "Test") {
						dispatch({
							type: "SET_TEST_CANVAS",
							payload: deepCopy(problem.canvasData),
						});
						testRef?.current?.handleReset(
							deepCopy(problem.canvasData)
						);
					}
					setActiveComponent(tab);
					// document.body.style.cursor = "default";
				}}
				tabs={["Canvas", "Solution", "Test"]}
			/>

			<div className="component-container relative">
				{/* <div
          className={
            "mt-5 flex flex-col gap-5 " +
            (activeComponent === "Details" ? "block" : "hidden")
          }
        >
          <DetailsTab />
        </div> */}
				<div
					className={
						activeComponent === "Canvas" ? "block" : "hidden"
					}
				>
					<CanvasDesignTab
						backupProblem={backupProblem}
						onSave={updateCanvas}
					/>
				</div>
				<div
					className={
						activeComponent === "Solution" ? "block" : "hidden"
					}
				>
					<SolutionCheckerTab onSave={updateSolutionChecker} />
				</div>
				<div
					className={activeComponent === "Test" ? "block" : "hidden"}
				>
					<CanvasPreview
						ref={testRef}
						onSubmit={onSubmit}
						takeSnapshot={false}
						giveHint={false}
					/>
				</div>
			</div>
			{/* <Confirmation open={open} setOpen={setOpen} onConfirm={deleteProblem} /> */}
		</div>
	);
};
const deepCopy = (obj) => {
	return typeof obj === "string"
		? JSON.parse(obj)
		: JSON.parse(JSON.stringify(obj));
};

const ImageEditor = ({ data, articleId, content, index, onSave }) => {
	const [image, setImage] = useState(null);

	useState(() => {
		setImage(data.image);
	}, [data.image]);

	return (
		<div className="bu-card-primary pb-10 rounded-[30px] flex flex-col min-h-[25rem]">
			<div className="flex flex-row justify-end">
				<div className="flex flex-row p-2 items-center">
					<Tooltip
						title={
							<h1 className="text-lg text-white">Delete Image</h1>
						}
						placement="top"
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
								onClick={() => {
									setImage(null);
								}}
							>
								<div className="flex items-center bu-text-primary text-3xl">
									<FontAwesomeIcon icon={faTrashCan} />
								</div>
							</IconButton>
							<div className="transform translate-y-[-50%] text-sm">
								Delete
							</div>
						</div>
					</Tooltip>
					<Tooltip
						title={
							<h1 className="text-lg text-white">Add Image</h1>
						}
						placement="top"
						arrow
						size="large"
					>
						<input
							type="file"
							id={"fileInput" + index}
							style={{ display: "none" }}
							onChange={(event) => {
								const file = event.target.files[0];
								setImage({
									url: URL.createObjectURL(file),
									caption: file.name,
									status: "new",
									file: file,
								});
							}}
						/>
						<div className="flex flex-col items-center bu-text-primary font-bold">
							<IconButton
								sx={{
									fontSize: "2rem",
									width: "3rem",
									height: "3rem",
								}}
								onClick={() => {
									document
										.getElementById("fileInput" + index)
										.click();
								}}
							>
								<div className="flex items-center bu-text-primary text-3xl">
									<FontAwesomeIcon icon={faAdd} />
								</div>
							</IconButton>
							<div className="transform translate-y-[-50%] text-sm">
								Add
							</div>
						</div>
					</Tooltip>
					<Tooltip
						title={<h1 className="text-lg text-white">Save All</h1>}
						placement="top"
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
								onClick={async () => {
									// First list all the images.file that are new
									if (image?.status === "new") {
										const formData = new FormData();
										formData.append("file", image.file);
										const res =
											await storageApi.upload(formData);
										if (res.success) {
											const newImage = { ...image };
											newImage.url = res.data.path;
											delete newImage.status;
											delete newImage.file;
											const newContent = [...content];
											newContent[index] = {
												...newContent[index],
												image: newImage,
											};
											setImage(newImage);
											const res2 =
												await articleApi.updateArticle(
													articleId,
													{
														content: newContent,
													}
												);
											if (res2.success) {
												// console.log(res);
												showSuccess(
													"Image updated successfully",
													res2
												);
												onSave(newImage);
											}
										}
									} else if (
										image === null &&
										data.image !== null
									) {
										// images are deleted
										const newContent = [...content];
										newContent[index] = {
											...newContent[index],
											image: image,
										};
										const res2 =
											await articleApi.updateArticle(
												articleId,
												{
													content: newContent,
												}
											);
										if (res2.success) {
											// console.log(res);
											showSuccess(
												"Image updated successfully",
												res2
											);
											console.log(
												await storageApi.remove(
													data.image.url
												)
											);
											onSave(image);
										}

										// update the data.images with the new images
									}
								}}
							>
								<div className="flex items-center bu-text-primary text-3xl">
									<FontAwesomeIcon icon={faFloppyDisk} />
								</div>
							</IconButton>
							<div className="transform translate-y-[-50%] text-sm">
								Save
							</div>
						</div>
					</Tooltip>
				</div>
			</div>
			{image && (
				<ImageLoader
					// key={i}
					src={image.url}
					// alt={image.caption}
					style={{
						width: "40rem",
						margin: "auto",
						pointerEvents: "none",
					}}
				/>
			)}
		</div>
	);
};

const SlideShow = ({ data, articleId, content, index, onSave }) => {
	const [images, setImages] = useState([]);
	const [serial, setSerial] = useState(0);

	useState(() => {
		console.log(data);
		const newImages = deepCopy(data.images);
		setImages(newImages);
		if (newImages.length > 0) {
			setSerial(0);
		} else {
			setSerial(-1);
		}
	}, [data.images]);

	return (
		<div className="flex flex-col bg-[#fbfbfb] rounded-[30px]">
			<div className="bg-[#fbfbfb] rounded-[30px] flex flex-col h-[32rem]">
				<div className="flex flex-row justify-between">
					<div className="flex flex-row p-4 items-start bu-text-primary text-2xl font-semibold">
						{serial + 1}/{images.length}
					</div>
					<div className="flex flex-row p-2 items-center">
						<Tooltip
							title={
								<h1 className="text-lg text-white">
									Delete Image
								</h1>
							}
							placement="top"
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
									onClick={() => {
										if (serial === -1) return;
										setImages((prev) => {
											const newImages = [...prev];
											newImages.splice(serial, 1);
											return newImages;
										});
										setSerial((prev) =>
											Math.min(prev, images.length - 2)
										);
									}}
								>
									<div className="flex items-center bu-text-primary text-3xl">
										<FontAwesomeIcon icon={faTrashCan} />
									</div>
								</IconButton>
								<div className="transform translate-y-[-50%] text-sm">
									Delete
								</div>
							</div>
						</Tooltip>
						<Tooltip
							title={
								<h1 className="text-lg text-white">
									Add Image
								</h1>
							}
							placement="top"
							arrow
							size="large"
						>
							<input
								type="file"
								id={"fileInput" + index}
								style={{ display: "none" }}
								onChange={(event) => {
									const file = event.target.files[0];
									// add this file to images array
									// insert this file to images array after the current index

									setImages((prev) => {
										const newImages = [...prev];
										const newImage = {
											url: URL.createObjectURL(file),
											caption: file.name,
											status: "new",
											file: file,
										};
										newImages.splice(
											serial + 1,
											0,
											newImage
										);
										return newImages;
									});
									setSerial((prev) => prev + 1);
								}}
							/>
							<div className="flex flex-col items-center bu-text-primary font-bold">
								<IconButton
									sx={{
										fontSize: "2rem",
										width: "3rem",
										height: "3rem",
									}}
									onClick={() => {
										document
											.getElementById("fileInput" + index)
											.click();
									}}
								>
									<div className="flex items-center bu-text-primary text-3xl">
										<FontAwesomeIcon icon={faAdd} />
									</div>
								</IconButton>
								<div className="transform translate-y-[-50%] text-sm">
									Add
								</div>
							</div>
						</Tooltip>
						<Tooltip
							title={
								<h1 className="text-lg text-white">Save All</h1>
							}
							placement="top"
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
									onClick={async () => {
										// First list all the images.file that are new
										let newImageFiles = [];
										images.forEach((image) => {
											if (image.status === "new") {
												newImageFiles.push(image.file);
											}
										});

										if (newImageFiles.length) {
											// Then upload all the new images
											const formData = new FormData();
											newImageFiles.forEach(
												(file, index) => {
													formData.append(
														"file",
														file
													);
												}
											);
											console.log(
												newImageFiles,
												formData
											);
											const res =
												await storageApi.upload(
													formData
												);
											console.log(res);
											if (res.success) {
												const newPaths =
													newImageFiles.length > 1
														? res.data.paths
														: [res.data.path];
												// now update the images array with the new paths on status "new"
												const newImages = [...images];
												let count = 0;
												newImages.forEach(
													(image, i) => {
														if (
															image.status ===
															"new"
														) {
															image.url =
																newPaths[
																	count++
																];
															// remove status and file field
															delete image.status;
															delete image.file;
														}
													}
												);
												console.log(newImages);

												const newContent = [...content];
												newContent[index] = {
													...newContent[index],
													images: newImages,
												};
												setImages(newImages);
												const res2 =
													await articleApi.updateArticle(
														articleId,
														{
															content: newContent,
														}
													);
												if (res2.success) {
													// console.log(res);
													showSuccess(
														"Images saved successfully",
														res2
													);
													onSave(newImages);
												}
											}
										} else if (
											images.length < data.images.length
										) {
											// images are deleted
											const newContent = [...content];
											newContent[index] = {
												...newContent[index],
												images: images,
											};
											const res2 =
												await articleApi.updateArticle(
													articleId,
													{
														content: newContent,
													}
												);
											if (res2.success) {
												// console.log(res);
												showSuccess(
													"Images saved successfully",
													res2
												);
												// Find which image was deleted by comparing url
												const deletedImages =
													data.images
														.filter((image) => {
															return !images.find(
																(img) =>
																	img.url ===
																	image.url
															);
														})
														.map(
															(image) => image.url
														);
												console.log(deletedImages);
												console.log(
													await storageApi.remove(
														deletedImages
													)
												);
												onSave(images);
												// update the data.images with the new images
											}
										}
									}}
								>
									<div className="flex items-center bu-text-primary text-3xl">
										<FontAwesomeIcon icon={faFloppyDisk} />
									</div>
								</IconButton>
								<div className="transform translate-y-[-50%] text-sm">
									Save
								</div>
							</div>
						</Tooltip>
					</div>
				</div>

				<div className="h-full flex-center">
					{images?.map((image, i) => {
						return (
							<ImageLoader
								key={i}
								src={image.url}
								alt={image.caption}
								style={{
									width: "40rem",
									margin: "auto",
									display: serial === i ? "block" : "none",
									pointerEvents: "none",
								}}
							/>
						);
					})}
				</div>
				{/* <img
          key={index}
          src={images[index]?.url}
          alt={images[index]?.caption}
          style={{ width: "40rem", margin: "auto" }}
        /> */}
			</div>
			<div className="w-full h-[.2rem] bg-gray-200"></div>
			<div className=" rounded-full w-80 mx-auto h-12 flex items-center justify-between gap-1 my-4">
				<div
					className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-l-full text-2xl"
					// style={{ visibility: serial === 0 ? "hidden" : "visible" }}
					onClick={() => {
						setSerial((prev) => Math.max(prev - 1, 0));
					}}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</div>

				<div
					className="flex gap-2 items-center justify-center bu-button-secondary w-full h-full text-2xl "
					// onClick={solutionSubmit}
				>
					<FontAwesomeIcon icon={faPlay} />
				</div>
				<div
					className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
					onClick={() => {
						setSerial((prev) =>
							Math.min(prev + 1, images.length - 1)
						);
					}}
					// style={{
					//   visibility: serial === images.length - 1 ? "hidden" : "visible",
					// }}
				>
					<FontAwesomeIcon icon={faArrowRight} />
				</div>
			</div>
			{/* <div className="flex flex-row justify-between w-full p-5">
        <button
          className="text-white font-semibold rounded-lg px-5 py-2 text-center bu-button-primary cursor-pointer flex flex-row gap-3 items-center text-2xl"
          style={{ visibility: serial === 0 ? "hidden" : "visible" }}
          onClick={() => {
            setSerial((prev) => Math.max(prev - 1, 0));
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Prev
        </button>
        <button
          className="text-white font-semibold rounded-lg px-5 py-2 text-center bu-button-primary cursor-pointer flex flex-row gap-3 items-center text-2xl"
          onClick={() => {
            setSerial((prev) => Math.min(prev + 1, images.length - 1));
          }}
          style={{
            visibility: serial === images.length - 1 ? "hidden" : "visible",
          }}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div> */}
		</div>
	);
};

const CustomButton = ({ onClick, label, icon }) => {
	return (
		<button
			className="flex flex-row items-center gap-2 px-5 bu-text-primary border-2 border-black dark:border-white rounded-full hover:bg-[#aadfcf] dark:hover:bg-pink-700 transition-colors duration-500  font-medium"
			onClick={onClick}
		>
			{label}
			{icon}
		</button>
	);
};
const WriteArticle = ({
	article,
	setArticle,
	colorMode,
	updateMarkdown,
	addContent,
	deleteContent,
}) => {
	return (
		<div className="flex flex-col justify-between gap-10">
			{article?.content?.length > 0 &&
				article?.content?.map((content, index) => {
					return (
						<>
							<div className="flex flex-row justify-center items-center gap-5">
								<CustomButton
									label="Markdown"
									icon={<FontAwesomeIcon icon={faAdd} />}
									onClick={() =>
										addContent(index, "markdown")
									}
								/>
								<CustomButton
									label="Problem"
									icon={<FontAwesomeIcon icon={faAdd} />}
									onClick={() => addContent(index, "canvas")}
								/>
								<CustomButton
									label="Solution"
									icon={<FontAwesomeIcon icon={faAdd} />}
									onClick={() =>
										addContent(index, "slideshow")
									}
								/>
								<CustomButton
									label="Image"
									icon={<FontAwesomeIcon icon={faAdd} />}
									onClick={() => addContent(index, "image")}
								/>
								{/* <CustomButton
                  label="Video"
                  icon={<FontAwesomeIcon icon={faAdd} />}
                  onClick={() => addContent(index, "video")}
                /> */}
								<IconButton
									sx={{
										fontSize: "2rem",
										width: "3rem",
										height: "3rem",
									}}
									onClick={() => deleteContent(index)}
								>
									<div className="flex flex-row items-center gap-2 bu-text-primary text-2xl">
										<FontAwesomeIcon icon={faTrashCan} />
									</div>
								</IconButton>
							</div>
							{content.type === "markdown" ? (
								<MarkDownContainer
									key={content.boxId}
									index={index}
									colorMode={colorMode}
									text={content.data}
									setText={updateMarkdown}
								/>
							) : content.type === "slideshow" ? (
								<SlideShow
									articleId={article.id}
									data={content}
									content={article.content}
									index={index}
									onSave={(images) =>
										setArticle((prev) => {
											const newContent = [
												...prev.content,
											];
											newContent[index].images = images;
											return {
												...prev,
												content: newContent,
											};
										})
									}
								/>
							) : content.type === "canvas" ? (
								<ProblemContextProvider>
									<DndProvider backend={HTML5Backend}>
										<ArticleCanvas
											articleId={article.id}
											data={content}
											content={article.content}
											index={index}
										/>
									</DndProvider>
								</ProblemContextProvider>
							) : content.type === "image" ? (
								<ImageEditor
									articleId={article.id}
									data={content}
									content={article.content}
									index={index}
									onSave={(image) =>
										setArticle((prev) => {
											const newContent = [
												...prev.content,
											];
											newContent[index].image = image;
											return {
												...prev,
												content: newContent,
											};
										})
									}
								/>
							) : content.type === "video" ? (
								<></>
							) : (
								<></>
							)}
						</>
					);
				})}
		</div>
	);
};

const SetterArticleEditor = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [article, setArticle] = useState(null);
	const articleBackup = useRef(null);
	const [boxCount, setBoxCount] = useState(0);

	function getColorModeFromLocalStorage() {
		return localStorage.getItem("color-theme") || "light";
	}
	const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

	const getArticleInfo = async () => {
		const res = await articleApi.getArticleById(id);
		if (res.success) {
			articleBackup.current = deepCopy(res.data);
			setArticle(res.data);
			//set box count as the max box id
			let max = 0;
			res.data.content?.forEach((content) => {
				if (content.boxId > max) {
					max = content.boxId;
				}
			});
			setBoxCount(max);

			// dispatch({
			//   type: "SET_INITIAL_STATE",
			//   payload: JSON.parse(
			//     JSON.stringify({
			//       ...res.data,
			//       test: null,
			//       testActivity: {},
			//       checkerCanvas: res.data.checkerCanvas ?? res.data.canvasData,
			//     })
			//   ),
			// });
			console.log(article);
			console.log("done");
		}
	};
	const saveArticle = async () => {
		const res = await articleApi.updateArticle(id, article);
		if (res.success) {
			showSuccess("Article saved successfully", res);
		}
	};

	const updateMarkdown = (index, textData) => {
		setArticle((prev) => {
			const newContent = [...prev.content];
			newContent[index].data = textData;
			return { ...prev, content: newContent };
		});
	};

	const addMarkdown = (index) => {
		setArticle((prev) => {
			let newContent = [...prev.content];
			newContent.splice(index, 0, {
				boxId: boxCount + 1,
				data: "type here",
				type: "markdown",
			});
			setBoxCount((prev) => prev + 1);
			return { ...prev, content: newContent };
		});
	};

	const addContent = (index, type) => {
		setArticle((prev) => {
			let newContent = [...prev.content];
			if (type === "markdown") {
				newContent.splice(index, 0, {
					boxId: boxCount + 1,
					data: "type here",
					type: type,
				});
			} else if (type === "canvas") {
				newContent.splice(index, 0, {
					boxId: boxCount + 1,
					type: type,
					canvasId: null,
					canvasData: null,
					checkerCode:
						"function solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}",
					editOptions: {},
					previewOptions: {},
					checkerCanvas: null,
				});
			} else if (type === "slideshow") {
				newContent.splice(index, 0, {
					boxId: boxCount + 1,
					type: type,
					images: [],
				});
			} else if (type === "image") {
				newContent.splice(index, 0, {
					boxId: boxCount + 1,
					type: type,
					image: null,
				});
			}
			setBoxCount((prev) => prev + 1);
			return { ...prev, content: newContent };
		});
	};

	const deleteMarkdown = (index) => {
		setArticle((prev) => {
			let newContent = [...prev.content];
			newContent.splice(index, 1);
			return { ...prev, content: newContent };
		});
	};

	const deleteContent = (index) => {
		setArticle((prev) => {
			let newContent = [...prev.content];
			newContent.splice(index, 1);
			return { ...prev, content: newContent };
		});
	};

	useEffect(() => {
		getArticleInfo();
		setLoading(false);
	}, []);

	useEffect(() => {
		console.log(article);
		//WriteArticle();
	}, [article]);

	return (
		article && (
			<div>
				<div className="flex flex-row justify-between">
					<Title title={article.title} sub_title={article.subtitle} />
					<div className="flex items-center">
						<Tooltip
							title={
								<h1 className="text-lg text-white">Preview</h1>
							}
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
											`/setter/articles/${article.id}`
										);
									}}
								>
									<FontAwesomeIcon
										icon={faArrowUpRightFromSquare}
									/>
								</div>
							</IconButton>
						</Tooltip>
					</div>
				</div>

				<div className="flex flex-col gap-5 pb-10">
					{/* <Title title={article.title} sub_title={article.subtitle} /> */}
					{/* Take input for Title and Subtitle */}
					<div className="flex flex-col gap-2">
						<div className="bu-text-primary text-2xl font-medium">
							Title
						</div>
						<input
							value={article.title}
							type="text"
							name="title"
							className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
							placeholder="Example Problem Name"
							required
							onChange={(e) => {
								setArticle((prev) => {
									return { ...prev, title: e.target.value };
								});
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div className="bu-text-primary text-2xl font-medium">
							Subtitle
						</div>
						<textarea
							value={article.subtitle}
							name="details"
							className="border rounded-lg block w-full p-2.5 px-5 bu-input-primary text-[140%]"
							placeholder=""
							onChange={(e) => {
								setArticle((prev) => {
									return {
										...prev,
										subtitle: e.target.value,
									};
								});
							}}
						/>
					</div>
				</div>
				<WriteArticle
					setArticle={setArticle}
					article={article}
					colorMode={colorMode}
					updateMarkdown={updateMarkdown}
					addContent={addContent}
					deleteContent={deleteContent}
				/>

				<div className="flex flex-row justify-center items-center gap-5 m-10">
					<CustomButton
						label="Markdown"
						icon={<FontAwesomeIcon icon={faAdd} />}
						onClick={() =>
							addContent(article.content.length, "markdown")
						}
					/>
					<CustomButton
						label="Problem"
						icon={<FontAwesomeIcon icon={faAdd} />}
						onClick={() =>
							addContent(article.content.length, "canvas")
						}
					/>
					<CustomButton
						label="Solution"
						icon={<FontAwesomeIcon icon={faAdd} />}
						onClick={() =>
							addContent(article.content.length, "slideshow")
						}
					/>
					<CustomButton
						label="Image"
						icon={<FontAwesomeIcon icon={faAdd} />}
						onClick={() =>
							addContent(article.content.length, "image")
						}
					/>
					{/* <CustomButton
            label="Video"
            icon={<FontAwesomeIcon icon={faAdd} />}
            onClick={() => addContent(article.content.length, "video")}
          /> */}
					<IconButton
						sx={{
							fontSize: "2rem",
							width: "3rem",
							height: "3rem",
						}}
						onClick={() => saveArticle()}
					>
						<div className="flex flex-row items-center gap-2 bu-text-primary text-2xl">
							<FontAwesomeIcon icon={faFloppyDisk} />
						</div>
					</IconButton>
				</div>
				{/* 
        <div className="flex justify-center">
          <div className="mx-6 pd-2">
            <button
              className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400"
              onClick={() => addMarkdown(article.content.length - 1)}
            >
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
          <div className="mx-6 pd-2">
            <button
              className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400"
              onClick={() => saveArticle()}
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
          </div>
        </div> */}
			</div>
		)
	);
};

export default SetterArticleEditor;
