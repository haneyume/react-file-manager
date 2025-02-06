import {
  IconFolderFilled,
  IconFileFilled,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useFileManager } from "../context/FileManagerContext";
import Path from "./Path";
import { useState } from "react";
import { Button, Menu } from "@mantine/core";

const Workspace = () => {
  const { files, currentFolder, setCurrentFolder } = useFileManager();
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const renderFiles = files?.filter((f) => f.id !== "0");

  return (
    <div className="w-[90%] h-full" style={{ border: "1px solid #c91414" }}>
      <Path />

      <div className="flex">
        {renderFiles.map((file) => {
          return (
            <>
              <Menu
                position="bottom-start"
                withArrow
                key={file.id}
                arrowPosition="center"
                opened={menuOpenId === file.id}
                onClose={() => setMenuOpenId(null)}
              >
                <Menu.Target>
                  <div
                    className="flex flex-col items-center m-2 cursor-pointer"
                    key={file.id}
                    onContextMenu={(e) => {
                      setMenuOpenId(file.id);
                      e.preventDefault();
                      setCurrentFolder(file);
                    }}
                  >
                    {file.isDir ? (
                      <IconFolderFilled stroke={2} size={100} color="#4ab7ff" />
                    ) : (
                      <IconFileFilled size={100} color="#fdcd53" />
                    )}
                    <div>{file.name}</div>
                  </div>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconEdit size={14} />}
                    onClick={() => alert(`Rename ${currentFolder?.name}`)}
                  >
                    Rename
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconTrash size={14} />}
                    color="red"
                    onClick={() => alert(`Delete ${currentFolder?.name}`)}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Workspace;
