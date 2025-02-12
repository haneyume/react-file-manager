import React from "react";
import Navbar from "./components/Navbar";
import FileManagerProvider from "./context/FileManagerContext";
import Workspace from "./components/Workspace";
import { FileType, TargetEvent } from "./type";
import { createTheme, MantineProvider } from "@mantine/core";

interface FileManagerProps {
  fs: FileType[];
  getOpenFile: ({ file }: { file: FileType }) => void;
  getTargetEvent: ({
    type,
    originTarget,
    newTarget,
  }: {
    type: TargetEvent;
    originTarget: FileType | null;
    newTarget: FileType;
  }) => void;
}
const FileManager: React.FC<FileManagerProps> = ({
  fs,
  getOpenFile,
  getTargetEvent,
}) => {
  const theme = createTheme({
    /** Put your mantine theme override here */
  });
  return (
    <MantineProvider theme={theme}>
      <FileManagerProvider
        fs={fs}
        getOpenFile={getOpenFile}
        getTargetEvent={getTargetEvent}
      >
        <div className="flex h-full">
          <Navbar />
          <Workspace />
        </div>
      </FileManagerProvider>
    </MantineProvider>
  );
};

export default FileManager;
