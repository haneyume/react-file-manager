type FileType = {
  id: string;
  name: string;
  isDir: boolean;
  parentId?: string;
  lastModified?: number;
  path: string;
  category?: Category | null;
};

type ViewStyle = "list" | "grid";

type FileMode = "File" | "Folder";

type Category = "product" | "sorting";

type TempTarget = FileType & {
  isCut: boolean;
};

type TargetEvent = "copyPaste" | "cutPaste" | "new" | "delete" | "rename";

type SearchMode = "Local" | "Global";

type Folder = FileType & {
  label: string;
  value: string;
  children: Folder[];
};

export type {
  FileType,
  ViewStyle,
  FileMode,
  Category,
  TempTarget,
  TargetEvent,
  SearchMode,
  Folder,
};
