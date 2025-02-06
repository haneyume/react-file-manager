import { Center, SegmentedControl } from "@mantine/core";
import { IconGridDots, IconList } from "@tabler/icons-react";
import { useFileManager } from "../context/FileManagerContext";
import { ViewStyle as ViewStyleType } from "../type";

// 檔案管理顯示模式
const ViewStyle = () => {
  const { viewStyle, setViewStyle } = useFileManager();
  return (
    <div className="pl-3">
      <SegmentedControl
        value={viewStyle}
        onChange={(value) => setViewStyle(value as ViewStyleType)}
        data={[
          {
            value: "list",
            label: (
              <Center style={{ gap: 10 }}>
                <IconList stroke={2} />
              </Center>
            ),
          },
          {
            value: "grid",
            label: (
              <Center style={{ gap: 10 }}>
                <IconGridDots stroke={2} />
              </Center>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ViewStyle;
