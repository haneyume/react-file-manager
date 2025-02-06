type FileType = {
  id: string;
  name: string;
  isDir: boolean;
  parentId?: string;
  lastModified?: number;
  path?: string;
};

type FileMode = "File" | "Folder";

export type { FileType, FileMode };
