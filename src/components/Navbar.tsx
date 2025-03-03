import { useMemo } from "react";
import { useFileManager } from "../context/FileManagerContext";
import { rootFile } from "../shared/static";
import { Group, Tree, TreeNodeData } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { Folder } from "../type";

type ElementProps = {
  className: string;
  style: React.CSSProperties;
  onClick: (event: React.MouseEvent) => void;
  "data-selected": boolean | undefined;
  "data-value": string;
  "data-hovered": boolean | undefined;
};

const Navbar = () => {
  const { files, currentFolder, setCurrentFolder } = useFileManager();

  // 過濾掉Root資料夾
  const filterRootFolder = useMemo(() => {
    return files.filter((f) => f.id !== "0");
  }, [files]);

  const transformedTree = useMemo(() => {
    // 建立一個 Map 來存放所有資料夾的節點
    const treeMap: Record<string, Folder> = {};

    // 初始化所有節點，確保每個資料夾都有 `children` 屬性
    filterRootFolder.forEach((file) => {
      if (file.isDir) {
        treeMap[file.id] = {
          ...file,
          label: file.name,
          value: file.path,
          children: [], // 預先給一個空陣列,準備存放子資料夾
        };
      }
    });

    const root: Folder[] = [];

    filterRootFolder.forEach((file) => {
      if (file.isDir) {
        if (file.parentId && file.parentId !== "0") {
          const parent = treeMap[file.parentId]; // 找到父節點
          if (parent) {
            parent.children.push(treeMap[file.id]); // 將子節點加入父節點的 children
          }
        } else {
          root.push(treeMap[file.id]); // 如果是根節點，直接加入 root
        }
      }
    });

    return root;
  }, [filterRootFolder]);

  const renderFolder = ({
    node,
    expanded,
    hasChildren,
    elementProps,
  }: {
    node: TreeNodeData;
    expanded: boolean;
    hasChildren: boolean;
    elementProps: ElementProps;
  }) => {
    const folder = node as Folder;
    return (
      <Group gap={5} ml={30} {...elementProps}>
        <a
          className="link"
          onClick={() => {
            setCurrentFolder({
              id: folder.id,
              name: folder.name,
              isDir: true,
              parentId: folder.parentId,
              lastModified: folder.lastModified,
              path: folder.path,
              category: null,
            });
          }}
          {...(currentFolder.id === folder.id ? { "data-active": true } : {})}
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
    );
  };

  console.log("transformedTree", transformedTree);
  return (
    <div className="w-[15%] bg-[#f9fafc] h-full min-w-[200px] ">
      <div
        onClick={() => setCurrentFolder(rootFile)}
        className="link"
        style={{
          color: "#ccc",
          fontSize: 25,
          padding: 15,
        }}
      >
        Root
      </div>
      <Tree data={transformedTree} levelOffset={23} renderNode={renderFolder} />
    </div>
  );
};

export default Navbar;
