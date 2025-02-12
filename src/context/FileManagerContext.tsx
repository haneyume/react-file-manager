import { createContext, useContext, useState } from "react";
import { FileType, TargetEvent, TempTarget, ViewStyle } from "../type";
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
  tempTarget: TempTarget | null;
  setTempTarget: React.Dispatch<React.SetStateAction<TempTarget | null>>;
  copyOrCutEvent: ({
    originTarget,
    isCut,
  }: {
    originTarget: FileType;
    isCut: boolean;
  }) => void;
  deleteEvent: (fileId: string) => void;
  reNameEvent: (file: FileType) => void;
  infoEvent: (file: FileType) => void;
  pasteEvent: (tempTarget: TempTarget) => void;
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
  fs: FileType[]; //初始化檔案資料(必須要包含根目錄 id:0)
  getOpenFile: ({ file }: { file: FileType }) => void; // 點兩下打開檔案的事件
  getTargetEvent: ({
    type,
    originTarget,
    newTarget,
  }: {
    type: TargetEvent;
    originTarget: FileType;
    newTarget: FileType;
  }) => void; // 取得正在操作的檔案/資料夾的事件( 複製貼上/剪下貼上/新增/刪除/重命名)
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
  tempTarget: null, // 暫存(複製/貼上)的檔案
  setTempTarget: () => {}, // 設定暫存(複製/貼上)的檔案
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
  getTargetEvent,
  getOpenFile,
}) => {
  // 所有檔案
  const [files, setFiles] = useState(fs);
  // 目前所在資料夾
  const [currentFolder, setCurrentFolder] = useState<FileType>(rootFile);

  // 檔案管理顯示模式
  const [viewStyle, setViewStyle] = useState<ViewStyle>("list");

  //  正在選擇的檔案
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  // 暫存(複製/貼上)的 檔案/資料夾
  const [tempTarget, setTempTarget] = useState<TempTarget | null>(null);
  // 來源(複製/貼上)的 檔案/資料夾
  const [originTarget, setOriginTarget] = useState<FileType | null>(null);

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

  // 複製剪下事件(存在 tempTarget 中)
  const copyOrCutEvent = ({
    originTarget,
    isCut,
  }: {
    originTarget: FileType;
    isCut: boolean;
  }) => {
    if (!originTarget) return;
    setOriginTarget(originTarget);

    const id = isCut ? originTarget.id : Date.now().toString();
    const newName = isCut ? originTarget.name : originTarget.name + "-複製";

    const newPath = getNewPath({
      currentFolder,
      isDir: originTarget.isDir,
      fileName: newName,
    });
    const newFile = {
      ...originTarget,
      id: id,
      name: newName,
      parentId: currentFolder.id,
      path: newPath,
    };
    setTempTarget({ ...newFile, isCut });
  };

  // 貼上事件
  const pasteEvent = (pasteTarget: TempTarget) => {
    if (!pasteTarget) return;
    let targetPaste = pasteTarget;

    // 檢查貼上的 檔案/資料夾 是否已經存在在 files 中
    const isExist = files.some((f) => f.id === pasteTarget.id);

    // 檢查是否在同一個資料夾
    const isSameFolder = pasteTarget.parentId === pasteTarget.id;

    const newName = isExist ? pasteTarget.name + "-複製" : pasteTarget.name;
    const newId = isExist ? Date.now().toString() : pasteTarget.id;
    const newParentId = !isSameFolder ? currentFolder.id : pasteTarget.parentId;
    const newPath = !isSameFolder
      ? getNewPath({
          currentFolder,
          isDir: pasteTarget.isDir,
          fileName: pasteTarget.name,
        })
      : pasteTarget.path;

    targetPaste = {
      ...pasteTarget,
      isCut: originTarget?.id === newId,
      id: newId,
      name: newName,
      parentId: newParentId,
      path: newPath,
    };

    //  將 目標檔案/資料夾 加入 暫存 目標(避免 來源目標會是錯誤的)
    setTempTarget(targetPaste);
    setFiles((prevFiles) => [...prevFiles, targetPaste]);
    getTargetEvent({
      type: targetPaste.isCut ? "cutPaste" : "copyPaste",
      originTarget: isExist ? pasteTarget : originTarget!, // 原始檔案
      newTarget: targetPaste,
    });
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
    tempTarget,
    setTempTarget,
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
