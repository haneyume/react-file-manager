import { useMemo } from "react";
import { useFileManager } from "../context/FileManagerContext";
import { rootFile } from "../shared/static";

const Navbar = () => {
  const { files, currentFolder, setCurrentFolder } = useFileManager();
  const initialFolder = useMemo(() => {
    return files.filter((f) => f.isDir && f.parentId === "0");
  }, [files]);

  const fs = useMemo(() => {
    return files.filter((f) => f.id !== "0");
  }, [files]);

  console.log("fs", fs);

  const transformedTree = useMemo(() => {
    const tree = fs.reduce((acc, file) => {
      if (file.isDir && file.parentId === "0") {
        acc[file.id] = file;
      }
      return acc;
    }, {});

    console.log("tree", tree);
    fs.forEach((file) => {
      console.log("file 1111", file);
      if (file.isDir && file.parentId !== "0") {
        console.log("file 22222", file);
        const parent = tree[file?.parentId];
        if (!parent?.children) {
          parent.children = [];
        }
        // 不存在的話就加入
        if (!parent.children.some((f) => f.id === file.id)) {
          parent.children.push(file);
        }
      }
    });

    return tree;
  }, [files]);

  console.log("transformedTree", transformedTree);
  return (
    <div className="w-[15%] bg-[#f9fafc] h-full min-w-[200px] ">
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
