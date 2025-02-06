import { useMemo } from "react";
import { useFileManager } from "../context/FileManagerContext";
import { rootFile } from "../shared/static";

const Navbar = () => {
  const { files, currentFolder, setCurrentFolder } = useFileManager();
  const initialFolder = useMemo(() => {
    return files.filter((f) => f.isDir && f.parentId === "0");
  }, [files]);
  return (
    <div className="w-[15%] bg-[#f9fafc] h-full">
      <div
        onClick={() => setCurrentFolder(rootFile)}
        className="link"
        style={{
          color: "#ccc",
          fontSize: 25,
          padding: 30,
          cursor: "pointer",
        }}
      >
        Root
      </div>
      <div className="flex flex-col">
        {initialFolder.map((file) => {
          return (
            <a
              className="link"
              key={file.id}
              onClick={() => setCurrentFolder(file)}
              style={{
                fontSize: 18,
                paddingLeft: 50,
              }}
              {...(currentFolder.id === file.id ? { "data-active": true } : {})}
            >
              <span>{file.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
