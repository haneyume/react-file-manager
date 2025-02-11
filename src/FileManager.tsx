import Navbar from "./components/Navbar";
import FileManagerProvider from "./context/FileManagerContext";
import Workspace from "./components/Workspace";
import { FileType } from "./type";
import { createTheme, MantineProvider } from "@mantine/core";

const FileManager = ({ fs, getTest }) => {
  const theme = createTheme({
    /** Put your mantine theme override here */
  });
  return (
    <MantineProvider theme={theme}>
      <FileManagerProvider fs={fs} getTest={getTest}>
        <div className="flex h-full">
          <Navbar />
          <Workspace />
        </div>
      </FileManagerProvider>
    </MantineProvider>
  );
};

export default FileManager;
