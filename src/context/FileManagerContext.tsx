import { createContext, useContext, useState } from "react";
import { FileType, TempFile, ViewStyle } from "../type";
import { getNewPath, rootFile } from "../shared/static";

interface Value {
  files: FileType[];
  setFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
  currentFolder: FileType;
  setCurrentFolder: React.Dispatch<React.SetStateAction<FileType>>;
  viewStyle: ViewStyle;
  setViewStyle: React.Dispatch<React.SetStateAction<ViewStyle>>;
  selectedFile: FileType | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileType | null>>;
  tempFile: TempFile | null;
  setTempFile: React.Dispatch<React.SetStateAction<TempFile | null>>;
  copyOrCutEvent: ({ file, isCut }: { file: FileType; isCut: boolean }) => void;
  deleteEvent: (fileId: string) => void;
  reNameEvent: (file: FileType) => void;
  infoEvent: (file: FileType) => void;
  pasteEvent: (tempFile: TempFile) => void;
  clickRightEvent: ({
    e,
    file,
  }: {
    e: React.MouseEvent;
    file: FileType;
  }) => void;
  createNewModalOpened: boolean;
  setCreateNewModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  infoModalOpened: boolean;
  setInfoModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpenId: string | null;
  setMenuOpenId: React.Dispatch<React.SetStateAction<string | null>>;
  menuPosition: { top: number; left: number } | null;
  setMenuPosition: React.Dispatch<
    React.SetStateAction<{ top: number; left: number } | null>
  >;
  renameFileId: string | null;
  setRenameFileId: React.Dispatch<React.SetStateAction<string | null>>;
  renameValue: string | null;
  setRenameValue: React.Dispatch<React.SetStateAction<string | null>>;
  saveRename: (file: FileType) => void;
}

interface FileManagerProviderProps {
  fs: FileType[];
  children: React.ReactNode;
}

const FileManagerContext = createContext<Value>({
  files: [], // 所有檔案狀態
  setFiles: () => {}, // 設定所有檔案
  currentFolder: rootFile, // 目前所在資料夾
  setCurrentFolder: () => {}, // 設定目前所在資料夾
  viewStyle: "list", // 檔案管理顯示模式
  setViewStyle: () => {}, // 設定檔案管理顯示模式
  selectedFile: null, //  正在選擇的(檔案、資料夾)
  setSelectedFile: () => {}, // 設定正在選擇的(檔案、資料夾)
  tempFile: null, // 暫存(複製/貼上)的檔案
  setTempFile: () => {}, // 設定暫存(複製/貼上)的檔案
  copyOrCutEvent: () => {}, // 複製剪下事件
  deleteEvent: () => {}, // 刪除事件
  reNameEvent: () => {}, // 重命名事件
  infoEvent: () => {}, // 點擊詳細資訊事件
  pasteEvent: () => {}, // 貼上事件
  clickRightEvent: () => {}, // 點擊滑鼠右鍵時事件
  createNewModalOpened: false, //建立新的(檔案/資料夾)modal開啟狀態
  setCreateNewModalOpened: () => {}, // 設定建立新的(檔案/資料夾)modal開啟狀態
  infoModalOpened: false, // 詳細資訊的modal開啟狀態
  setInfoModalOpened: () => {}, // 設定詳細資訊的modal開啟狀態
  menuOpenId: null, // 控制右鍵選單的開啟狀態
  setMenuOpenId: () => {}, // 設定右鍵選單的開啟狀態
  menuPosition: null, // 右鍵選單的位置
  setMenuPosition: () => {}, // 設定右鍵選單的位置
  renameFileId: null, //  儲存目前正在重新命名的檔案 id
  setRenameFileId: () => {}, // 設定儲存目前正在重新命名的檔案 id
  renameValue: null, // 目前 正在重新命名 的內容
  setRenameValue: () => {}, // 設定目前 正在重新命名 的內容
  saveRename: () => {}, // 模擬儲存新檔案名稱的動作
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

  // 檔案管理顯示模式
  const [viewStyle, setViewStyle] = useState<ViewStyle>("list");

  //  正在選擇的檔案
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  // 暫存(複製/貼上)的檔案
  const [tempFile, setTempFile] = useState<TempFile | null>(null);

  // 建立新的(檔案/資料夾)modal開啟狀態
  const [createNewModalOpened, setCreateNewModalOpened] = useState(false);

  // 詳細資訊的modal開啟狀態
  const [infoModalOpened, setInfoModalOpened] = useState(false);

  // 控制右鍵選單的開啟狀態（此處用檔案 id 來控制）
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // 右鍵選單的位置
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // 儲存目前正在重新命名的檔案 id
  const [renameFileId, setRenameFileId] = useState<string | null>(null);

  // 目前 正在重新命名 的內容
  const [renameValue, setRenameValue] = useState<string | null>(null);

  // 複製剪下事件(存在 tempFile 中)
  const copyOrCutEvent = ({
    file,
    isCut,
  }: {
    file: FileType;
    isCut: boolean;
  }) => {
    if (!file) return;

    const id = isCut ? file.id : Date.now().toString();
    const newName = isCut ? file.name : file.name + "-複製";

    const newPath = getNewPath({
      currentFolder,
      isDir: file.isDir,
      fileName: newName,
    });
    const newFile = {
      ...file,
      id: id,
      name: newName,
      parentId: currentFolder.id,
      path: newPath,
    };

    console.log("newFile cut ", newFile);
    setTempFile({ ...newFile, isCut });
  };

  // 貼上事件
  const pasteEvent = (tempFile: TempFile) => {
    if (!tempFile) return;

    const isSameFolder = tempFile.parentId === currentFolder.id;
    let newFile = tempFile;

    // cut or copy 在不同資料夾, 要更新 parentId、path
    if (!isSameFolder) {
      newFile = {
        ...tempFile,
        parentId: currentFolder.id,
        path: getNewPath({
          currentFolder,
          isDir: tempFile.isDir,
          fileName: tempFile.name,
        }),
      };
    }
    setFiles((prevFiles) => [...prevFiles, newFile]);
  };

  // 點擊滑鼠右鍵時事件
  const clickRightEvent = ({
    e,
    file,
  }: {
    e: React.MouseEvent;
    file: FileType;
  }) => {
    // 阻止點擊事件
    e.preventDefault();

    setSelectedFile(file);

    // 找到點擊的 `div`（這裡用 e.currentTarget 指向被點擊的區塊）
    const targetElement = e.currentTarget as HTMLElement;
    const rect = targetElement.getBoundingClientRect();

    // 記錄滑鼠點擊位置
    setMenuPosition({
      top: rect.top,
      left: rect.right + 10,
    });
    // 開啟當前的menu
    setMenuOpenId(file.id);
  };

  // 點擊 重新命名 後，將檔案切換為編輯狀態
  const reNameEvent = (file: FileType) => {
    setRenameFileId(file.id);
    setRenameValue(file.name);
    setMenuOpenId(null); // 關閉右鍵選單
  };

  // 點擊 詳細資訊事件
  const infoEvent = (file: FileType) => {
    setSelectedFile(file);
    setInfoModalOpened(true); // 打開 詳細資訊modal
    setMenuOpenId(null); // 關閉右鍵選單, 但不影響 詳細資訊modal
  };
  // 點擊 刪除事件
  const deleteEvent = (fileId: string) => {
    const newFiles = files.filter((f) => f.id !== fileId);
    setFiles(newFiles);
  };
  // 模擬儲存新檔案名稱的動作，這裡可以做 API 請求或直接更新 state
  const saveRename = (file: FileType) => {
    // 如果 renameValue 為空，則使用原始檔案名稱
    const newName = !renameValue ? file.name : renameValue;
    const newFiles = files.map((f) => {
      if (f.id === file.id) {
        return {
          ...f,
          name: newName,
          path:
            currentFolder.id === "0"
              ? `/${newName}`
              : `${currentFolder.path}/${newName}`,
        };
      }
      return f;
    });
    setFiles(newFiles);

    // 更新檔案名稱的邏輯
    setRenameFileId(null);
  };

  const value = {
    files,
    setFiles,
    currentFolder,
    setCurrentFolder,
    viewStyle,
    setViewStyle,
    selectedFile,
    setSelectedFile,
    tempFile,
    setTempFile,
    copyOrCutEvent,
    deleteEvent,
    reNameEvent,
    infoEvent,
    pasteEvent,
    clickRightEvent,
    createNewModalOpened,
    setCreateNewModalOpened,
    infoModalOpened,
    setInfoModalOpened,
    menuOpenId,
    setMenuOpenId,
    menuPosition,
    setMenuPosition,
    renameFileId,
    setRenameFileId,
    renameValue,
    setRenameValue,
    saveRename,
  };
  return (
    <FileManagerContext.Provider value={value}>
      {children}
    </FileManagerContext.Provider>
  );
};

export default FileManagerProvider;
