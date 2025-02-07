import {
  IconFolderFilled,
  IconFileFilled,
  IconEdit,
  IconTrash,
  IconInfoCircle,
  IconCut,
  IconCopy,
  IconClipboard,
} from "@tabler/icons-react";
import { useFileManager } from "../context/FileManagerContext";
import Path from "./Path";
import { useEffect, useMemo, useState } from "react";
import { Menu, TextInput } from "@mantine/core";
import { FileType } from "../type";
import CreateNew from "./CreateNew";
import InfoModal from "./InfoModal";

type TempFile = FileType & {
  isCut: boolean;
};

const Workspace = () => {
  const { files, setFiles, currentFolder, setCurrentFolder, viewStyle } =
    useFileManager();

  const [infoOpened, setInfoOpened] = useState(false);

  // 控制右鍵選單的開啟狀態（此處用檔案 id 來控制）
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // 右鍵選單的位置
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // 儲存目前正在編輯的檔案 id
  const [renameFileId, setRenameFileId] = useState<string | null>(null);

  // TextInput 的內容
  const [inputValue, setInputValue] = useState<string | null>(null);

  //  正在選擇的檔案
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  // 搜尋文字
  const [searchText, setSearchText] = useState<string>("");

  // 暫存(複製/貼上)的檔案
  const [tempFile, setTempFile] = useState<TempFile | null>();

  // 紀錄 滑鼠 hover 的檔案
  // const [hoveredFile, setHoveredFile] = useState<FileType | null>(null);

  const renderFiles = useMemo(() => {
    return files?.filter(
      (f) => f.id !== "0" && f.parentId === currentFolder.id
    );
  }, [files, currentFolder]);

  // 當點擊右鍵時，設定選單開啟
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

  // 點擊詳細資訊事件
  const infoEvent = (file: FileType) => {
    setSelectedFile(file);
    setInfoOpened(true); // 打開 詳細資訊modal
    setMenuOpenId(null); // 關閉右鍵選單, 但不影響 詳細資訊modal
  };

  // 點擊 Rename 選項後，將檔案切換為編輯狀態
  const reNameEvent = (file: FileType) => {
    setRenameFileId(file.id);
    setInputValue(file.name);
    setMenuOpenId(null); // 關閉右鍵選單
  };

  // 模擬儲存新檔案名稱的動作，這裡可以做 API 請求或直接更新 state
  const saveRename = (file: FileType) => {
    console.log("currentFolder", currentFolder);
    console.log("Saving new name:", inputValue, "for file", file);

    // 如果 inputValue 為空，則使用原始檔案名稱
    const newName = !inputValue ? file.name : inputValue;
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

  // 刪除事件
  const deleteEvent = (fileId: string) => {
    const newFiles = files.filter((f) => f.id !== fileId);

    setFiles(newFiles);
  };

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

    const newFile = {
      ...file,
      id: id,
      name: newName,
      parentId: currentFolder.id,

      path: file.isDir
        ? currentFolder.id === "0"
          ? `/${newName}`
          : `${currentFolder.path}/${newName}`
        : currentFolder.path,
    };

    console.log("newFile", newFile);
    setTempFile({ ...newFile, isCut });
  };

  console.log("tempFile", tempFile);

  // 貼上事件
  const pasteEvent = (tempFile: TempFile) => {
    console.log("pasteEvent tempFile", tempFile);
    if (!tempFile) return;
    setFiles((prevFiles) => [...prevFiles, tempFile]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        (e.key.toLowerCase() === "c" || e.key.toLowerCase() === "x")
      ) {
        if (!selectedFile) return; // 沒有選擇檔案的話，不做任何動作

        if (e.ctrlKey && e.key.toLowerCase() === "c") {
          copyOrCutEvent({
            file: selectedFile!,
            isCut: false,
          });
        } else if (e.ctrlKey && e.key.toLowerCase() === "x") {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.id !== selectedFile!.id)
          );

          copyOrCutEvent({
            file: selectedFile!,
            isCut: true,
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFile]);

  return (
    <>
      {/* 檔案資訊modal */}
      <InfoModal
        opened={infoOpened}
        close={() => setInfoOpened(false)}
        file={selectedFile!}
      />

      <div className="w-[85%] h-full">
        <Path searchText={searchText} setSearchText={setSearchText} />

        <div
          className={`${viewStyle === "grid" ? "flex flex-wrap" : ""} h-full`}
          // className={viewStyle === "grid" ? "flex flex-wrap h-full" : "h-full"}
          tabIndex={0} // 讓 div 可接收鍵盤事件
          onClick={(e) => {
            // 檢查點擊的元素是否是檔案元素,如果不是取消選取檔案
            if (
              !(e.target as HTMLElement).closest(".file") &&
              !(e.target as HTMLElement).closest(".menuDropdown")
            ) {
              console.log("取消選取檔案");
              setSelectedFile(null);
            }
          }}
          onKeyDown={(e) => {
            console.log("e", e);
            // 在任一處按下 ctrl + v
            if (e.ctrlKey && e.key.toLowerCase() === "v") {
              console.log("tempFile", tempFile);
              pasteEvent(tempFile);
            }
          }}
        >
          {renderFiles.map((file) => {
            return (
              <div key={file.id} className="menu">
                <Menu
                  position="right-start"
                  withArrow
                  key={file.id}
                  arrowPosition="center"
                  opened={menuOpenId === file.id}
                  onClose={() => setMenuOpenId(null)}
                >
                  <Menu.Target>
                    <a
                      style={{
                        width: viewStyle === "list" ? "max-content" : "auto",
                      }}
                      className={`${viewStyle === "grid" ? "flex-col" : ""} flex items-center m-2 cursor-pointer relative file`}
                      key={file.id}
                      // 單擊選取檔案
                      onClick={() => {
                        setSelectedFile(file);
                      }}
                      // 雙擊進入資料夾
                      onDoubleClick={() => {
                        if (file.isDir) {
                          setCurrentFolder(file);
                        }
                      }}
                      // 點右鍵顯示右鍵選單
                      onContextMenu={(e) =>
                        clickRightEvent({
                          e,
                          file,
                        })
                      }
                      {...(selectedFile?.id === file.id
                        ? { "data-active": true }
                        : {})}
                    >
                      {file.isDir ? (
                        <IconFolderFilled
                          stroke={2}
                          size={viewStyle === "grid" ? 100 : 30}
                          color="#4ab7ff"
                        />
                      ) : (
                        <IconFileFilled
                          size={viewStyle === "grid" ? 100 : 30}
                          color="#fdcd53"
                        />
                      )}

                      {/* 根據是否正在編輯決定要顯示 TextInput 或純文字 */}
                      {renameFileId === file.id ? (
                        <TextInput
                          size="xs"
                          value={inputValue!}
                          onChange={(event) => {
                            setInputValue(event.currentTarget.value);
                          }}
                          // 當 TextInput 失去焦點時保存變更 檔案名稱
                          onBlur={() => saveRename(file)}
                          // 當按下 Enter 鍵時也儲存變更 檔案名稱
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveRename(file);
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <div>{file.name}</div>
                      )}
                    </a>
                  </Menu.Target>

                  <Menu.Dropdown
                    className="absolute menuDropdown"
                    style={{
                      top: menuPosition?.top ?? 0, // 如果 menuPosition 存在則使用該座標
                      left: menuPosition?.left ?? 0,
                    }}
                  >
                    <Menu.Item
                      leftSection={<IconInfoCircle stroke={1.25} size={18} />}
                      onClick={() => infoEvent(file)}
                    >
                      詳細資訊
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconCut stroke={1.25} size={18} />}
                      onClick={() =>
                        copyOrCutEvent({
                          file,
                          isCut: true,
                        })
                      }
                    >
                      剪下
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconCopy stroke={1.25} size={18} />}
                      onClick={() =>
                        copyOrCutEvent({
                          file,
                          isCut: false,
                        })
                      }
                    >
                      複製
                    </Menu.Item>

                    <Menu.Item
                      leftSection={<IconClipboard stroke={1.25} size={18} />}
                      onClick={() => infoEvent(file)}
                      disabled={!tempFile}
                    >
                      貼上
                    </Menu.Item>

                    <Menu.Item
                      leftSection={<IconEdit stroke={1.25} size={18} />}
                      onClick={() => reNameEvent(file)}
                    >
                      重新命名
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash stroke={1.25} size={18} />}
                      color="red"
                      onClick={() => deleteEvent(file.id)}
                    >
                      刪除
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            );
          })}

          <CreateNew />
        </div>
      </div>
    </>
  );
};

export default Workspace;
