import Navbar from "./components/Navbar";
import FileManagerProvider from "./context/FileManagerContext";
import Workspace from "./components/Workspace";
import { FileType } from "./type";
import { createTheme, MantineProvider } from "@mantine/core";

const fs: FileType[] = [
  { id: "0", name: "/", path: "/", isDir: true },
  {
    id: "1",
    name: "report.pdf",
    isDir: false,
    parentId: "0",
    lastModified: 1677021347,
  },
  {
    id: "2",
    name: "Documents",
    isDir: true,
    parentId: "0",
    path: "/Documents",
    lastModified: 1704720512,
  },
  {
    id: "3",
    name: "Personal",
    isDir: true,
    parentId: "2",
    path: "/Documents/Personal",
    lastModified: 1686630289,
  },
  {
    id: "4",
    name: "report.docx",
    isDir: false,
    parentId: "0",
    lastModified: 1679647141,
  },
  {
    id: "5",
    name: "Images",
    isDir: true,
    parentId: "0",
    path: "/Images",
    lastModified: 1679647141,
  },
  {
    id: "6",
    name: "logo.png",
    isDir: false,
    parentId: "5",
    lastModified: 1679647141,
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
