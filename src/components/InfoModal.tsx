import { Modal } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconFolderFilled, IconFileFilled } from "@tabler/icons-react";
import { formattedDate } from "../shared/static";
import { FileType } from "../type";
interface InfoModalProps {
  opened: boolean;
  close: () => void;
  file: FileType;
}
const InfoModal: React.FC<InfoModalProps> = ({ opened, close, file }) => {
  return (
    <Modal opened={opened} onClose={close} title="詳細資訊">
      <div className="flex flex-col items-center">
        {file?.isDir ? (
          <IconFolderFilled stroke={2} size={100} color="#4ab7ff" />
        ) : (
          <IconFileFilled size={100} color="#fdcd53" />
        )}
        <Text className="mt-2">名稱: {file?.name}</Text>
        <Text className="mt-2">path: {file?.path}</Text>
        <Text className="mt-2">
          創建時間: {formattedDate(file?.lastModified || 0)}
        </Text>
      </div>
    </Modal>
  );
};

export default InfoModal;
