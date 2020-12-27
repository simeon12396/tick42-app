import { MenuItem, Select } from "@material-ui/core";
import React from "react";
import { IEmployee } from "../../store/actions/employees/employeesActions";

interface ICustomDropdown {
  name: string;
  options: IEmployee[];
  onChange: (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
  defaultValue: string;
}

const CustomDropdown = ({ name, options, onChange, defaultValue }: ICustomDropdown): JSX.Element => {
  return (
    // <select name={name} onChange={onChange} value={defaultValue}>
    //   {options.map((e: IEmployee) => (
    //     <option key={e.id} value={e.id}>{`${e.firstName} ${e.lastName}`}</option>
    //   ))}
    // </select>
    <Select id={name} value={defaultValue} onChange={onChange}>
      {options.map((e: IEmployee) => (
        <MenuItem key={e.id} value={e.id}>{`${e.firstName} ${e.lastName}`}</MenuItem>
      ))}
    </Select>
  );
};

export default CustomDropdown;
