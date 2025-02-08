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

export type { FileType, ViewStyle, FileMode, Category };
