import { TextInput, Text } from "@mantine/core";
import { IconCircleArrowUpFilled, IconSearch } from "@tabler/icons-react";
import ViewStyle from "./ViewStyle";
import { useFileManager } from "../context/FileManagerContext";

const Path = () => {
  const { currentFolder } = useFileManager();
  return (
    <div className="flex items-center w-full justify-between">
      <div
        style={{
          display: "flex",
        }}
      >
        <IconCircleArrowUpFilled color="#b1b1b1" />

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
