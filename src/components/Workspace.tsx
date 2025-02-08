import { useFileManager } from "../context/FileManagerContext";
import Path from "./Path";
import { useEffect, useMemo, useState } from "react";
import { Menu } from "@mantine/core";
import CreateNew from "./CreateNew";
import InfoModal from "./InfoModal";
import TargetItem from "./UI/TargetItem";
import MenuDropdown from "./UI/MenuDropdown";

const Workspace = () => {
  const {
    files,
    setFiles,
    currentFolder,
    viewStyle,
    selectedFile,
    setSelectedFile,
    tempFile,
    copyOrCutEvent,
    pasteEvent,
    infoOpened,
    setInfoOpened,
    menuOpenId,
    setMenuOpenId,
  } = useFileManager();


  // 搜尋文字
  const [searchText, setSearchText] = useState<string>("");

  const renderFiles = useMemo(() => {
    return files?.filter(
      (f) => f.id !== "0" && f.parentId === currentFolder.id
    );
  }, [files, currentFolder]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCopy = e.key.toLowerCase() === "c";
      const isCut = e.key.toLowerCase() === "x";
      const isCtrlOrCmd = e.ctrlKey || e.metaKey; // 兼容 window 和mac 的快捷鍵

      if (isCtrlOrCmd && (isCopy || isCut)) {
        if (!selectedFile) return; // 沒有選擇檔案的話，不做任何動作

        if (isCopy) {
          copyOrCutEvent({
            file: selectedFile!,
            isCut: false,
          });
        } else if (isCut) {
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

  console.log("files", files);

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
            const isCtrlOrCmd = e.ctrlKey || e.metaKey; // 兼容 window 和mac 的快捷鍵
            const isPaste = e.key.toLowerCase() === "v";

            //  檔案管理任一處按下 ctrl + v
            if (isCtrlOrCmd && isPaste) {
              pasteEvent(tempFile!);
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
                    <TargetItem file={file} />
                  </Menu.Target>

                  <MenuDropdown file={file} />
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
