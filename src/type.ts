type FileType = {
  id: string;
  name: string;
  isDir: boolean;
  parentId?: string;
  lastModified?: number;
  path?: string;
};

export type { FileType };
