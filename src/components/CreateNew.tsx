import {
  Button,
  Modal,
  SegmentedControl,
  TextInput,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useFileManager } from "../context/FileManagerContext";
import { Category, FileMode, FileType } from "../type";
import { useState } from "react";
import { categoryTitle, getNewPath } from "../shared/static";

const CreateNew = () => {
  const { setFiles, currentFolder, viewStyle } = useFileManager();
  const [opened, { open, close }] = useDisclosure(false);

  // 創建新的檔案/ 資料夾
  const [fileMode, setFileMode] = useState<FileMode>("Folder");

  // 檔案類型
  const [fileCategory, setFileCategory] = useState<Category | null>("product");

  // TextInput 的內容
  const [inputValue, setInputValue] = useState<string | null>(null);

  const [error, setError] = useState(false);

  const createNewInit = () => {
    setError(false);
    setInputValue(null);
    setFileMode("Folder");
    setFileCategory("product");
  };

  //創建新的檔案/ 資料夾
  const createNew = ({
    inputValue,
    fileMode,
  }: {
    inputValue: string | null;
    fileMode: FileMode;
  }) => {
    if (!inputValue) {
      setError(true);
      return;
    }

    const newName =
      fileMode === "File"
        ? `${inputValue}.${categoryTitle[fileCategory!]}`
        : inputValue;

    const category = fileMode === "File" ? fileCategory : null;

    const newPath = getNewPath({
      currentFolder,
      isDir: fileMode === "Folder",
      fileName: newName,
    });
    const newFile: FileType = {
      id: Date.now().toString(),
      name: newName,
      isDir: fileMode === "Folder",
      parentId: currentFolder.id,
      lastModified: Date.now(),
      path: newPath,
      category: category,
    };

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
              style={{ width: "50%" }}
              data={["Folder", "File"]}
              value={fileMode}
              onChange={(value) => setFileMode(value as FileMode)}
            />
          </div>
          {fileMode === "File" && (
            <div className="flex justify-center mt-2">
              <SegmentedControl
                style={{ width: "50%" }}
                data={[
                  { label: "製品", value: "product" },
                  { label: "排版", value: "sorting" },
                ]}
                value={fileCategory!}
                onChange={(value) => setFileCategory(value as Category)}
              />
            </div>
          )}

          <div className="flex items-center justify-center mt-3">
            <TextInput
              // required
              value={inputValue!}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError(false);
              }}
              style={{ width: "80%" }}
              placeholder="Name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createNew({
                    inputValue,
                    fileMode,
                  });
                }
              }}
              autoFocus
              error={error && "必填欄位"}
            />
            {fileMode === "File" && (
              <Text
                fw={700}
                c="#7a7a7a"
              >{`.${categoryTitle[fileCategory!]}`}</Text>
            )}
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

      {viewStyle === "grid" ? (
        <div className="createNewIcon" onClick={open}>
          <IconPlus stroke={2} color="#7a7a7a" />
        </div>
      ) : (
        <Button variant="filled" color="#4ab7ff" onClick={open}>
          Create New
        </Button>
      )}
    </>
  );
};

export default CreateNew;
