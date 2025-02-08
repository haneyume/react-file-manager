import Navbar from "./components/Navbar";
import FileManagerProvider from "./context/FileManagerContext";
import Workspace from "./components/Workspace";
import { FileType } from "./type";
import { createTheme, MantineProvider } from "@mantine/core";

const fs: FileType[] = [
  { id: "0", name: "/", path: "/", isDir: true },
  {
    id: "1",
    name: "123.製品",
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
    name: "456.排版",
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
    name: "全聯.製品",
    isDir: false,
    parentId: "5",
    lastModified: 1679647141,
    path: "/所有製品專案",
    category: "product",
  },
];
const FileManager = () => {
  const theme = createTheme({
    /** Put your mantine theme override here */
  });
  return (
    <MantineProvider theme={theme}>
      <FileManagerProvider fs={fs}>
        <div className="flex h-full">
          <Navbar />
          <Workspace />
        </div>
      </FileManagerProvider>
    </MantineProvider>
  );
};

export default FileManager;
