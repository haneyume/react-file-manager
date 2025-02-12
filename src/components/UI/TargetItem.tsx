import { useFileManager } from "../../context/FileManagerContext";
import { GetFileIcon } from "../../shared/GetFileIcon";
import { FileType } from "../../type";
import { TextInput, Text } from "@mantine/core";
import { categoryTitle } from "../../shared/static";

// file、folder item
const TargetItem = ({ file }: { file: FileType }) => {
  const {
    setCurrentFolder,
    viewStyle,
    selectedFile,
    setSelectedFile,
    renameValue,
    clickRightEvent,
    renameFileId,
    setRenameValue,
    saveRename,
  } = useFileManager();

  return (
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
      {...(selectedFile?.id === file.id ? { "data-active": true } : {})}
    >
      {GetFileIcon({
        file,
        viewStyle,
      })}

      {/* 根據是否正在編輯決定要顯示 TextInput 或純文字 */}
      {renameFileId === file.id ? (
        <>
          <TextInput
            size="xs"
            value={renameValue!}
            onChange={(event) => {
              setRenameValue(event.currentTarget.value);
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
          {!file.isDir && (
            <Text
              fw={700}
              c="#7a7a7a"
            >{`.${categoryTitle[file.category!]}`}</Text>
          )}
        </>
      ) : (
        <div>
          {" "}
          {file.isDir
            ? file.name
            : `${file.name}.${categoryTitle[file.category!]}`}
        </div>
      )}
    </a>
  );
};

export default TargetItem;
