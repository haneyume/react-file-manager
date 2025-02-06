import {
  IconCircleArrowUpFilled,
  IconFolderFilled,
  IconFileFilled,
} from "@tabler/icons-react";
import { useFileManager } from "../context/FileManagerContext";

const Workspace = () => {
  const { files } = useFileManager();

  return (
    <div
      className="w-[90%] h-full"
      //   style={{
      //     width: "90%",
      //     height: "100%",
      //   }}
    >
      <div
        className="flex w-full justify-between"
        style={{
          border: "1px solid #ccc",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
          }}
        >
          <IconCircleArrowUpFilled />
        </div>
        <div
          style={{
            border: "1px solid #ccc",
          }}
        >
          search
        </div>
      </div>

      <div className="flex">
        {files.map((file) => {
          return (
            <div
              className="flex flex-col items-center m-2"
              key={file.id}
              
            >
              {file.isDir ? (
                <IconFolderFilled stroke={2} size={100} color="#4ab7ff" />
              ) : (
                <IconFileFilled size={100} color="#fdcd53" />
              )}
              <div>{file.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Workspace;
