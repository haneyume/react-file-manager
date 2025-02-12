import { useMemo } from "react";
import { useFileManager } from "../context/FileManagerContext";
import { rootFile } from "../shared/static";
import { Group, Tree } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

const Navbar = () => {
  const { files, currentFolder, setCurrentFolder } = useFileManager();
  const initialFolder = useMemo(() => {
    return files.filter((f) => f.isDir && f.parentId === "0");
  }, [files]);

  const fs = useMemo(() => {
    return files.filter((f) => f.id !== "0");
  }, [files]);

  // const transformedTree = useMemo(() => {
  //   const tree = fs.reduce((acc, file) => {
  //     if (file.isDir && file.parentId === "0") {
  //       acc[file.id] = file;
  //     }
  //     return acc;
  //   }, []);

  //   console.log("tree", tree);
  //   fs.forEach((file) => {
  //     console.log("file 1111", file);
  //     if (file.isDir && file.parentId !== "0") {
  //       console.log("file 22222", file);
  //       const parent = tree[file?.parentId];
  //       if (!parent?.children) {
  //         parent.children = [];
  //       }
  //       // 不存在的話就加入
  //       if (!parent.children.some((f) => f.id === file.id)) {
  //         parent.children.push(file);
  //       }
  //     }
  //   });

  //   return tree;
  // }, [fs]);

  const transformedTree = useMemo(() => {
    // 建立一個 Map 來存放所有節點
    const treeMap: Record<string, any> = {};

    // 初始化所有節點，確保每個資料夾都有 `children` 屬性
    fs.forEach((file) => {
      if (file.isDir) {
        treeMap[file.id] = {
          ...file,
          label: file.name,
          value: file.path,
          children: [],
        };
      }
    });

    const root: any[] = [];

    fs.forEach((file) => {
      if (file.isDir) {
        if (file.parentId && file.parentId !== "0") {
          const parent = treeMap[file.parentId];
          if (parent) {
            parent.children.push(treeMap[file.id]);
          }
        } else {
          root.push(treeMap[file.id]);
        }
      }
    });

    return root;
  }, [fs]);

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
      {/* <div className="flex flex-col">
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
      </div> */}
      <Tree
        data={transformedTree}
        levelOffset={23}
        renderNode={({ node, expanded, hasChildren, elementProps }) => (
          <Group gap={5} ml={30} {...elementProps}>
            <a
              className="link"
              onClick={() => {
                console.log("node", node);
                setCurrentFolder({
                  id: node.id,
                  name: node.name,
                  isDir: true,
                  parentId: node.parentId,
                  lastModified: node.lastModified,
                  path: node.path,
                  category: null,
                });
              }}
              {...(currentFolder.id === node.id ? { "data-active": true } : {})}
            >
              {node.label}
            </a>
            {hasChildren && (
              <IconChevronDown
                size={18}
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            )}
          </Group>
        )}
      />
    </div>
  );
};

export default Navbar;
