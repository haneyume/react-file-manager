import { createContext, useContext, useState } from "react";
import { FileType, ViewStyle } from "../type";
import { rootFile } from "../shared/static";

interface Value {
  files: FileType[];
  setFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
  currentFolder: FileType;
  setCurrentFolder: React.Dispatch<React.SetStateAction<FileType>>;
  viewStyle: ViewStyle;
  setViewStyle: React.Dispatch<React.SetStateAction<ViewStyle>>;
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
  viewStyle: "list",
  setViewStyle: () => {},
});

export const useFileManager = () => useContext(FileManagerContext);

const FileManagerProvider: React.FC<FileManagerProviderProps> = ({
  fs,
  children,
}) => {
  // 所有檔案
  const [files, setFiles] = useState(fs);
  // 目前所在資料夾
  const [currentFolder, setCurrentFolder] = useState<FileType>(rootFile);

  // 檔案管理顯示
  const [viewStyle, setViewStyle] = useState<ViewStyle>("list");

  const value = {
    files,
    setFiles,
    currentFolder,
    setCurrentFolder,
    viewStyle,
    setViewStyle,
  };
  return (
    <FileManagerContext.Provider value={value}>
      {children}
    </FileManagerContext.Provider>
  );
};

export default FileManagerProvider;
