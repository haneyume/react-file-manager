import { useFileManager } from "../context/FileManagerContext";
import Path from "./Path";
import { useEffect, useMemo, useState } from "react";
import { Menu } from "@mantine/core";
import CreateNew from "./CreateNew";
import InfoModal from "./InfoModal";
import TargetItem from "./UI/TargetItem";
import MenuDropdown from "./UI/MenuDropdown";
import { IconClipboard, IconPlus } from "@tabler/icons-react";

const Workspace = () => {
  const {
    files,
    setFiles,
    currentFolder,
    viewStyle,
    selectedFile,
    setSelectedFile,
    tempTarget,
    copyOrCutEvent,
    pasteEvent,
    infoModalOpened,
    setInfoModalOpened,
    menuOpenId,
    setMenuOpenId,
    setCreateNewModalOpened,
  } = useFileManager();

  // 搜尋文字
  const [searchText, setSearchText] = useState<string>("");

  // 任一處menu 的開啟狀態
  const [anyWhereMenuOpened, setAnyWhereMenuOpened] = useState(false);

  // 任一處menu 的位置
  const [anyWhereMenuPosition, setAnyWhereMenuPosition] = useState({
    top: 0,
    left: 0,
  });

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
            originTarget: selectedFile!,
            isCut: false,
          });
        } else if (isCut) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.id !== selectedFile!.id)
          );

          copyOrCutEvent({
            originTarget: selectedFile!,
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

  console.log("menuOpenId", menuOpenId);

  // 點任一處的事件
  const clickAnyWhereEvent = (e: React.MouseEvent) => {
    // 關閉任一處menu開啟狀態
    setAnyWhereMenuOpened(false);
    // 檢查點擊的元素不是檔案元素,以及右側的選單元素
    if (
      !(e.target as HTMLElement).closest(".file") &&
      !(e.target as HTMLElement).closest(".menuDropdown")
    ) {
      console.log("取消選取檔案");
      setSelectedFile(null);
      setMenuOpenId(null); // 關閉右鍵選單
    }
  };
  return (
    <>
      {/* 檔案資訊modal */}
      <InfoModal
        opened={infoModalOpened}
        close={() => setInfoModalOpened(false)}
        file={selectedFile!}
      />

      <div className="w-[85%] h-full">
        <Path searchText={searchText} setSearchText={setSearchText} />

        <div
          className={`${viewStyle === "grid" ? "flex flex-wrap" : ""} h-full`}
          tabIndex={0} // 讓 div 可接收鍵盤事件
          // 這是點任一處的事件
          onClick={(e) => clickAnyWhereEvent(e)}
          onKeyDown={(e) => {
            const isCtrlOrCmd = e.ctrlKey || e.metaKey; // 兼容 window 和mac 的快捷鍵
            const isPaste = e.key.toLowerCase() === "v";

            //  檔案管理任一處按下 ctrl + v
            if (isCtrlOrCmd && isPaste) {
              pasteEvent(tempTarget!);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            // 檢查點擊的元素不是檔案元素,以及右側的選單元素
            if (
              !(e.target as HTMLElement).closest(".file") &&
              !(e.target as HTMLElement).closest(".menuDropdown") &&
              !(e.target as HTMLElement).closest("#createNewIcon")
            ) {
              setAnyWhereMenuPosition({ top: e.clientY, left: e.clientX });
              setAnyWhereMenuOpened(true);
            }
          }}
        >
          <Menu shadow="md" width={200} opened={anyWhereMenuOpened}>
            <Menu.Target>
              <div
                className="absolute"
                style={{
                  top: anyWhereMenuPosition.top,
                  left: anyWhereMenuPosition.left,
                }}
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconPlus stroke={1.25} />}
                onClick={() => {
                  setCreateNewModalOpened(true);
                }}
              >
                Create New
              </Menu.Item>
              <Menu.Item
                leftSection={<IconClipboard stroke={1.25} />}
                disabled={!tempTarget}
                onClick={() => pasteEvent(tempTarget!)}
              >
                貼上
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
