import React from "react";
import Select, { components } from "react-select";

type MultiSelectInput = {
  options: Array<{ value: string; label: string }> | undefined;
  size?: string;
  id: string;
  setSelectedOptions: (e: any) => void;
  isSearchable: boolean;
  menuPlacement: any;
  components: any;
  value?: any;
};

function ReactSelect({
  options,
  setSelectedOptions,
  size,
  id,
  isSearchable,
  menuPlacement,
  components,
  value,
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
      menuPlacement={menuPlacement}
      components={components}
      value={value}
    />
  );
}

export { ReactSelect };
