import { createContext, useContext, useState } from "react";
import { FileType } from "../type";

interface Value {
  files: FileType[];
  setFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
  currentFolder: string;
  setCurrentFolder: React.Dispatch<React.SetStateAction<string>>;
}

interface FileManagerProviderProps {
  fs: FileType[];
  children: React.ReactNode;
}

const FileManagerContext = createContext<Value>({
  files: [],
  setFiles: () => {},
  currentFolder: "0",
  setCurrentFolder: () => {},
});

export const useFileManager = () => useContext(FileManagerContext);

const FileManagerProvider: React.FC<FileManagerProviderProps> = ({
  fs,
  children,
}) => {
  const [files, setFiles] = useState(fs);
  const [currentFolder, setCurrentFolder] = useState("0");

  const value = {
    files,
    setFiles,
    currentFolder,
    setCurrentFolder,
  };
  return (
    <FileManagerContext.Provider value={value}>
      {children}
    </FileManagerContext.Provider>
  );
};

export default FileManagerProvider;
