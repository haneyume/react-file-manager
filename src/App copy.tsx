// import { useState, useMemo } from "react";
// // import "./App.css";
// import {
//   IconFolderFilled,
//   IconFileFilled,
//   IconCircleArrowUpFilled,
// } from "@tabler/icons-react";
// const fs = [
//   { id: "0", name: "/", path: "/", isDir: true },
//   {
//     id: "1",
//     name: "report.pdf",
//     isDir: false,
//     parentId: "0",
//     lastModified: 1677021347,
//   },
//   {
//     id: "2",
//     name: "Documents",
//     isDir: true,
//     parentId: "0",
//     path: "/Documents",
//     lastModified: 1704720512,
//   },
//   {
//     id: "3",
//     name: "Personal",
//     isDir: true,
//     parentId: "2",
//     path: "/Documents/Personal",
//     lastModified: 1686630289,
//   },
//   {
//     id: "4",
//     name: "report.docx",
//     isDir: false,
//     parentId: "0",
//     lastModified: 1679647141,
//   },
//   {
//     id: "5",
//     name: "Images",
//     isDir: true,
//     parentId: "0",
//     path: "/Images",
//   },
//   {
//     id: "6",
//     name: "logo.png",
//     isDir: false,
//     parentId: "5",
//   },
// ];
// function App() {
//   const [files, setFiles] = useState(fs);

//   const [currentFolder, setCurrentFolder] = useState("0");

//   const initialFolder = useMemo(() => {
//     return files.filter((f) => f.isDir && f.parentId === "0");
//   }, [files]);

//   console.log("currentFolder", currentFolder);
//   return (
//     <div
//       className="flex min-h-screen"
//       style={{
//         border: "1px solid green",
//       }}
//     >
//       <div
//         style={{
//           width: "10%",
//           height: "100%",
//           border: "1px solid black",
//           background: "#f9fafc",
//         }}
//       >
//         <span
//           onClick={() => setCurrentFolder("0")}
//           style={{
//             color: "#ccc",
//             fontSize: 20,
//             padding: 10,
//             cursor: "pointer",
//           }}
//         >
//           Root
//         </span>
//         <div
//           // className="flex"
//           // style={{
//           //   display: "flex",
//           //   border: "1px solid red",
//           // }}
//         >
//           {initialFolder.map((file) => {
//             console.log("file", file);
//             return (
//               <a
//                 key={file.id}
//                 // className="link"
//                 onClick={() => setCurrentFolder(file)}
//                 data-active={currentFolder.id === file.id}
//               >
//                 <span>{file.name}</span>
//               </a>
//             );
//           })}
//         </div>
//       </div>
//       <div
//         style={{
//           width: "90%",
//           height: "100%",
//           border: "1px solid red",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             width: "100%",
//             border: "1px solid #ccc",
//             justifyContent: "space-between",
//           }}
//         >
//           <div
//             style={{
//               border: "1px solid #ccc",
//             }}
//           >
//             <IconCircleArrowUpFilled />
//           </div>
//           <div
//             style={{
//               border: "1px solid #ccc",
//             }}
//           >
//             search
//           </div>
//         </div>

//         <div className="flex">
//           {files.map((file) => {
//             return (
//               <div
//                 style={{
//                   margin: 5,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 {file.isDir ? (
//                   <IconFolderFilled stroke={2} size={100} color="#4ab7ff" />
//                 ) : (
//                   <IconFileFilled size={100} color="#fdcd53" />
//                 )}
//                 <div>{file.name}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
