import { FileType } from "../type";

export const rootFile: FileType = {
  id: "0",
  name: "/",
  path: "/",
  isDir: true,
};

export const formattedDate = (lastModified: number) => {
  const date = new Date(lastModified);
  return date.toLocaleString("zh-TW", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
};
