import { MenuItem, Select } from "@material-ui/core";
import React from "react";
import { TOption } from "../../misc/misc";

interface ICustomDropdown {
  name: string;
  options: TOption;
  onChange: (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
  value: string;
}

//TODO Make the component to be more generic

const CustomDropdown = ({ name, options, onChange, value }: ICustomDropdown): JSX.Element => {
  return (
    <>
      <Select id={name} value={value} onChange={onChange}>
        {name === "employees" && options.type.map((e: any) => <MenuItem key={e.id} value={e.id}>{`${e.firstName} ${e.lastName}`}</MenuItem>)}
        {name === "companies" &&
          options.type.map((e: any) => (
            <MenuItem key={e.id} value={e.id}>
              {e.name}
            </MenuItem>
          ))}
        {name === "departments" &&
          options.type.map((e: any) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
      </Select>
    </>
  );
};

export default CustomDropdown;
