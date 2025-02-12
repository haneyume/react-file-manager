import { useEffect, useState } from "react";
import {
  Combobox,
  ScrollArea,
  SegmentedControl,
  TextInput,
  useCombobox,
  Text,
} from "@mantine/core";
import { useFileManager } from "../../context/FileManagerContext";
import { FileType, SearchMode } from "../../type";
import { GetFileIcon } from "../../shared/GetFileIcon";
import { IconSearch } from "@tabler/icons-react";

const SearchBar = () => {
  const { files, currentFolder, setCurrentFolder, setSelectedFile } =
    useFileManager();

  const [searchMode, setSearchMode] = useState<SearchMode>("Local");

  const getSearchBarList = () => {
    const searchBarList = files?.filter((file) => file.id !== "0");
    if (searchMode === "Local") {
      return searchBarList.filter((item) => item.parentId === currentFolder.id);
    }
    return searchBarList;
  };

  const searchBarList = getSearchBarList();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState("");

  const filteredOptions = searchBarList.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase().trim())
  );

  // 點擊選項時，觸發的事件
  const clickOption = (item: FileType) => {
    // 檢查是不是在同一層的資料夾
    const isSameFolder = currentFolder.id === item.parentId;

    // 如果是同一層的檔案, hightLight
    if (isSameFolder && !item.isDir) {
      setSelectedFile(item);
    } else {
      const targetId = item.isDir ? item.id : item.parentId;
      const findFolder = files.find((f) => f.id === targetId);

      setCurrentFolder(findFolder!);
      setSelectedFile(item);
    }
  };

  const options = filteredOptions.map((item) => (
    <Combobox.Option
      value={item.name}
      key={item.id}
      onClick={() => clickOption(item)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {GetFileIcon({
            file: item,
            viewStyle: "list",
          })}
          {item.name}
        </div>
        <Text fw={700} c="#7a7a7a">
          {item?.path}
        </Text>
      </div>
    </Combobox.Option>
  ));

  // 輸入框沒有值時，關閉下拉選單
  useEffect(() => {
    if (!value) {
      combobox.closeDropdown();
    }
  }, [value]);

  useEffect(() => {
    // 下拉選單關閉時
    if (!combobox.dropdownOpened) {
      setValue("");
    }
  }, [combobox]);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}
      width={400}
    >
      <Combobox.Target>
        <TextInput
          w={400}
          leftSection={<IconSearch stroke={2} />}
          placeholder="Search"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Combobox.Header>
            <SegmentedControl
              className="segmentedControl"
              value={searchMode}
              style={{ width: "100%" }}
              data={["Local", "Global"]}
              onChange={(v) => {
                setSearchMode(v as SearchMode);
                combobox.openDropdown();
              }}
            />
          </Combobox.Header>
          <ScrollArea.Autosize mah={200} type="scroll">
            {options.length === 0 ? (
              <Combobox.Empty>No Result</Combobox.Empty>
            ) : (
              options
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SearchBar;
