// const KonvaButton = (props) => {
//   return (
//     <Label onClick={props.onClick} x={props.x} y={props.y}>
//       <Tag
//         fill="black"
//         lineJoin="round"
//         // shadowColor="black"
//         // shadowBlur={10}
//         // shadowOffset={10}
//         shadowOpacity={0.5}
//         cornerRadius={10}
//       ></Tag>
//       <Text
//         text={props.text}
//         fontSize={18}
//         fill="white"
//         padding={5}
//         fontFamily="Calibri"
//       />
//     </Label>
//   );
// };

// const CustomDisk = ({
//   data,
//   extraDisk,
//   setExtraDisk,
//   handleDiskDragStart,
//   handleDiskDragEnd,
//   handleDiskHover,
//   handleDiskUnhover,
//   calculateDiskWidth,
// }) => {
//   return (
//     <>
//       <Line
//         points={[0, 260, 20 + pegWidth * data.numberOfPegs, 260]}
//         stroke={"rgb(236, 72, 153)"}
//         strokeWidth={1}
//       />
//       <KonvaButton
//         text="<"
//         x={pegWidth - 15}
//         y={270}
//         onClick={() =>
//           extraDisk > -1 ? setExtraDisk((prev) => prev - 1) : setExtraDisk(9)
//         }
//       />
//       {extraDisk !== -1 ? (
//         <Rect
//           onMouseEnter={(e) => {
//             document.body.style.cursor = "pointer";
//             handleDiskHover(e);
//           }}
//           onMouseLeave={(e) => {
//             document.body.style.cursor = "default";
//             handleDiskUnhover(e);
//           }}
//           key={-1}
//           x={
//             pegWidth * 1 +
//             pegWidth / 2 -
//             calculateDiskWidth(extraDisk) / 2 +
//             1 * sep
//           }
//           y={275}
//           width={calculateDiskWidth(extraDisk)}
//           height={diskHeight}
//           fill={colors[extraDisk]}
//           draggable={true}
//           onDragStart={(e) => handleDiskDragStart(e, -1)}
//           onDragEnd={(e) => handleDiskDragEnd(e, -1)}
//           shadowColor="black"
//           shadowBlur={10}
//           shadowOpacity={0.6}
//           shadowOffsetX={0}
//           shadowOffsetY={0}
//           disk={extraDisk}
//           pegIndex={-1}
//           isExtra={true}
//           strokeEnabled={true}
//           opacity={0.9}
//           cornerRadius={[10, 10, 10, 10]}
//         />
//       ) : (
//         <></>
//       )}

//       <KonvaButton
//         text=">"
//         x={2 * pegWidth + 15}
//         y={270}
//         onClick={() =>
//           extraDisk < 9 ? setExtraDisk(extraDisk + 1) : setExtraDisk(-1)
//         }
//       />
//     </>
//   );
// };