import { createContext, useContext, useState } from "react";
import { FileType } from "../type";
import { rootFile } from "../shared/static";

interface Value {
  files: FileType[];
  setFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
  currentFolder: FileType;
  setCurrentFolder: React.Dispatch<React.SetStateAction<FileType>>;
}

interface FileManagerProviderProps {
  fs: FileType[];
  children: React.ReactNode;
}

const FileManagerContext = createContext<Value>({
  files: [],
  setFiles: () => {},
  currentFolder: rootFile,
  setCurrentFolder: () => {},
});

export const useFileManager = () => useContext(FileManagerContext);

const FileManagerProvider: React.FC<FileManagerProviderProps> = ({
  fs,
  children,
}) => {
  const [files, setFiles] = useState(fs);
  const [currentFolder, setCurrentFolder] = useState<FileType>(rootFile);

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
