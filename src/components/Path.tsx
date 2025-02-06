import { TextInput, Text } from "@mantine/core";
import { IconCircleArrowUpFilled, IconSearch } from "@tabler/icons-react";
import ViewStyle from "./ViewStyle";
import { useFileManager } from "../context/FileManagerContext";

const Path = () => {
  const { files, currentFolder, setCurrentFolder } = useFileManager();

  // 點擊 返回上一層
  const clickPreviousLevel = () => {
    if (currentFolder.id !== "0") {
      console.log("currentFolder.id", currentFolder.id);
      const findParentFolder = files?.find(
        (f) => f.id === currentFolder.parentId
      );

      setCurrentFolder(findParentFolder!);
    }
  };
  return (
    <div className="flex items-center w-full justify-between">
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          className={
            currentFolder.id === "0" ? "cursor-default" : "cursor-pointer"
          }
          onClick={clickPreviousLevel}
        >
          <IconCircleArrowUpFilled color="#b1b1b1" />
        </div>

        <div className="ml-3 flex">
          {currentFolder.id !== "0" && currentFolder?.name && (
            <Text
              style={{
                marginLeft: 5,
              }}
              fw={700}
              c="#b1b1b1"
            >
              {currentFolder.path}
            </Text>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <TextInput leftSection={<IconSearch />} placeholder="搜尋" />
        {/* 檔案管理顯示模式 */}
        <ViewStyle />
      </div>
    </div>
  );
};

export default Path;
