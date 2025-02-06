import { Button, Modal, SegmentedControl, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useFileManager } from "../context/FileManagerContext";
import { FileMode, FileType } from "../type";
import { useState } from "react";

const CreateNew = () => {
  const { setFiles, currentFolder } = useFileManager();
  const [opened, { open, close }] = useDisclosure(false);

  // 創建新的檔案/ 資料夾
  const [fileMode, setFileMode] = useState<FileMode>("File");

  const [inputValue, setInputValue] = useState<string | null>(null);

  const createNewInit = () => {
    setInputValue(null);
    setFileMode("File");
  };

  //創建新的檔案/ 資料夾
  const createNew = ({
    inputValue,
    fileMode,
  }: {
    inputValue: string | null;
    fileMode: FileMode;
  }) => {
    const newFile: FileType = {
      id: Date.now().toString(),
      name: inputValue!,
      isDir: fileMode === "Folder",
      parentId: currentFolder.id,
      lastModified: Date.now(),
      path: `${currentFolder.path}/${inputValue}`,
    };

    console.log("newFile", newFile);

    setFiles((prevFiles) => [...prevFiles, newFile]);
    close(); // 關閉 Modal
    createNewInit();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create New">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <SegmentedControl
              style={{
                width: "50%",
              }}
              data={["File", "Folder"]}
              value={fileMode}
              onChange={(value) => setFileMode(value as FileMode)}
            />
          </div>

          <div className="flex justify-center mt-3">
            <TextInput
              value={inputValue!}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                width: "80%",
              }}
              placeholder="Name"
            />
          </div>

          <div className="flex justify-center mt-3">
            <Button
              variant="filled"
              color="#4ab7ff"
              onClick={() =>
                createNew({
                  inputValue,
                  fileMode,
                })
              }
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>

      <div className="createNewIcon" onClick={open}>
        <IconPlus stroke={2} color="#7a7a7a" />
      </div>
    </>
  );
};

export default CreateNew;
