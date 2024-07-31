import React from "react";
import Select from "react-select";

type MultiSelectInput = {
  options: Array<{ value: string; label: string }> | undefined;
  size?: string;
  id: string;
  setSelectedOptions: (e: any) => void;
  isSearchable: boolean;
};

function ReactSelect({
  options,
  setSelectedOptions,
  size,
  id,
  isSearchable,
}: MultiSelectInput) {
  return (
    <Select
      id={id}
      options={options}
      isMulti
      closeMenuOnSelect={false}
      isSearchable={isSearchable}
      onChange={(e: any) => {
        setSelectedOptions(e);
      }}
      //   classNamePrefix="multiselect-dropdown"
      //   className={
      //     size === 'small'
      //       ? 'multiselect-dropdown multiselect-dropdown--small'
      //       : 'multiselect-dropdown'
      //   }
    />
  );
}

export { ReactSelect };
