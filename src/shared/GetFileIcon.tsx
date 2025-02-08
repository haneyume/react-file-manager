import { IconCategory, IconFolderFilled, IconNut } from "@tabler/icons-react";
import { FileType, ViewStyle } from "../type";

export const GetFileIcon = ({
  file,
  viewStyle,
}: {
  file: FileType;
  viewStyle?: ViewStyle;
}) => {
  const iconSize = viewStyle === "list" ? 30 : 100;
  if (file?.isDir) {
    return <IconFolderFilled stroke={2} size={iconSize} color="#4ab7ff" />;
  } else {
    return file?.category === "sorting" ? (
      <IconCategory size={iconSize} color="#fdcd53" />
    ) : (
      <IconNut size={iconSize} color="#fdcd53" />
    );
  }
};
