import { IEmployee } from "../../store/actions/employees/employeesActions";

interface ICustomDropdown {
  name: string;
  options: IEmployee[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  defaultValue: string;
}

const CustomDropdown = ({ name, options, onChange, defaultValue }: ICustomDropdown): JSX.Element => {
  return (
    <select name={name} onChange={onChange} value={defaultValue}>
      {options.map((e: IEmployee) => (
        <option key={e.id} value={e.id}>{`${e.firstName} ${e.lastName}`}</option>
      ))}
    </select>
  );
};

export default CustomDropdown;
