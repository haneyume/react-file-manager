import { Menu } from "@mantine/core";
import {
  IconClipboard,
  IconCopy,
  IconCut,
  IconEdit,
  IconInfoCircle,
  IconTrash,
} from "@tabler/icons-react";

import { useFileManager } from "../../context/FileManagerContext";
import { FileType } from "../../type";

const MenuDropdown = ({ file }: { file: FileType }) => {
  const {
    setFiles,
    tempFile,
    copyOrCutEvent,
    infoEvent,
    reNameEvent,
    deleteEvent,
    menuPosition,
    pasteEvent,
  } = useFileManager();
  return (
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
        onClick={() => {
          setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file!.id));
          copyOrCutEvent({
            file,
            isCut: true,
          });
        }}
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
        onClick={() => pasteEvent(tempFile!)}
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
  );
};

export default MenuDropdown;
