type FileType = {
  id: string;
  name: string;
  isDir: boolean;
  parentId?: string;
  lastModified?: number;
  path?: string;
};

type ViewStyle = "list" | "grid";

type FileMode = "File" | "Folder";

export type { FileType, ViewStyle, FileMode };
