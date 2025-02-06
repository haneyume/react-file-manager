import { TextInput } from "@mantine/core";
import { IconCircleArrowUpFilled, IconSearch } from "@tabler/icons-react";
import ViewStyle from "./ViewStyle";

const Path = () => {
  return (
    <div
      className="flex items-center w-full justify-between"
      style={{
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
        }}
      >
        <IconCircleArrowUpFilled color="#b1b1b1" />
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
