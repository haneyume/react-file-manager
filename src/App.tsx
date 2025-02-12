import FileManager from "./FileManager";
import { FileType } from "./type";

const fs: FileType[] = [
  { id: "0", name: "/", path: "/", isDir: true },
  {
    id: "1",
    name: "123",
    isDir: false,
    parentId: "0",
    lastModified: 1677021347,
    path: "/",
    category: "product",
  },
  {
    id: "2",
    name: "所有的排版專案",
    isDir: true,
    parentId: "0",
    path: "/所有的排版專案",
    lastModified: 1704720512,
  },
  {
    id: "3",
    name: "美而美專案",
    isDir: true,
    parentId: "2",
    path: "/所有的排版專案/美而美專案",
    lastModified: 1686630289,
  },
  {
    id: "4",
    name: "456",
    isDir: false,
    parentId: "0",
    lastModified: 1679647141,
    path: "/",
    category: "sorting",
  },
  {
    id: "5",
    name: "所有製品專案",
    isDir: true,
    parentId: "0",
    path: "/所有製品專案",
    lastModified: 1679647141,
  },
  {
    id: "6",
    name: "全聯",
    isDir: false,
    parentId: "5",
    lastModified: 1679647141,
    path: "/所有製品專案",
    category: "product",
  },
  {
    id: "7",
    name: "1111Root",
    isDir: true,
    parentId: "0",
    path: "/1111Root",
    lastModified: 1679647141,
  },
  {
    id: "8",
    name: "1111製品",
    isDir: true,
    parentId: "5",
    path: "/1111製品",
    lastModified: 1679647141,
  },
  {
    id: "9",
    name: "1111排版",
    isDir: true,
    parentId: "2",
    path: "/1111排版",
    lastModified: 1679647141,
  },
];
function App() {
  return (
    <FileManager
      fs={fs}
      getOpenFile={(v) => {
        console.log("getOpenFile", v);
      }}
      getTargetEvent={(v) => {
        console.log("getTargetEvent", v);
      }}
    />
  );
}

export default App;
