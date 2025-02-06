import { useMemo } from "react";
import { useFileManager } from "../context/FileManagerContext";

const Navbar = () => {
  const { files, currentFolder, setCurrentFolder } = useFileManager();
  const initialFolder = useMemo(() => {
    return files.filter((f) => f.isDir && f.parentId === "0");
  }, [files]);
  return (
    <div
      className="w-[30%] bg-[#f9fafc] h-full"
      // style={{
      //   height: "100%",
      // }}
    >
      <div
        onClick={() => setCurrentFolder("0")}
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
          console.log("file", file);
          return (
            <a
              className="link"
              key={file.id}
              onClick={() => setCurrentFolder(file.id)}
              style={{
                fontSize: 18,
                paddingLeft: 50,
              }}
              {...(currentFolder === file.id ? { "data-active": true } : {})}
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
