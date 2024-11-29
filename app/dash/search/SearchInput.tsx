import { getUsers } from "@/app/api/search";
import { Combobox, Loader, TextInput, useCombobox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useRef, useState } from "react";

interface SearchInputProps {
  onUserSelect: (userId: number) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onUserSelect }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(false);

  const dataQuery = useQuery({
    queryKey: ["search", value],
    queryFn: async () => getUsers(value),
    enabled: value.length > 0,
    initialData: [],
  });

  const options = dataQuery.data.map((item) => (
    <Combobox.Option value={JSON.stringify(item)} key={item.id}>
      {item.name}
    </Combobox.Option>
  ));

  console.log(dataQuery.data);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        const option = JSON.parse(optionValue);
        onUserSelect(option.id);
        setValue(dataQuery.data.find((item) => item.id === option.id)?.name || "");
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          size="lg"
          label="Enter username to search"
          placeholder="Search user..."
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
          }}
          onBlur={() => combobox.closeDropdown()}
          rightSection={dataQuery.isFetching && <Loader size={18} />}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}
          {options.length == 0 && <Combobox.Empty>No results found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SearchInput;
