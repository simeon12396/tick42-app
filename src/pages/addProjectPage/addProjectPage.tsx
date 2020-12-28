import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/common/customButton/customButton";
import CustomTextField from "../../components/common/customTextField/customTextField";
import CustomDropdown from "../../components/customDropdown/customDropdown";
import { TRootState } from "../../store/reducers";
import SendIcon from "@material-ui/icons/Send";
import { addNewProject, IProject } from "../../store/actions/projects/projectsActions";
import { TOnChangeEvent } from "../../misc/misc";

const AddProjectPage = (): JSX.Element => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const employeesSelector = useSelector((state: TRootState) => state.employeesReducer.rawData);
  const companiesSelector = useSelector((state: TRootState) => state.companiesReducer.rawData);
  const projects = useSelector((state: TRootState) => state.projectsReducer.rawData);
  const departments = projects.map((p: IProject) => p.department);

  const [employeeId, setEmployeeId] = useState<string>(employeesSelector[0].id);
  const [companyId, setCompanyId] = useState<string>(companiesSelector[0].id);
  const [departmentId, setDepartmentId] = useState<string>(departments[0]);
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onChangeEmployee = (e: TOnChangeEvent) => setEmployeeId(e.target.value as string);
  const onChangeCompany = (e: TOnChangeEvent) => setCompanyId(e.target.value as string);
  const onChangeId = (e: TOnChangeEvent) => setId(e.target.value as string);
  const onChangeName = (e: TOnChangeEvent) => setName(e.target.value as string);
  const onChangeDepartment = (e: TOnChangeEvent) => setDepartmentId(e.target.value as string);

  const onClickSubmit = (e: FormEvent) => {
    e.preventDefault();
    const projectData = { id, name, employeesId: [employeeId], companyId: companyId, department: departmentId };
    dispatch(addNewProject(projectData));
  };

  return (
    <FormControl classes={{ root: styles.formControlRoot }}>
      <CustomTextField id="id" label="Identifier" variant="outlined" color="primary" onChange={onChangeId} />
      <CustomTextField id="name" label="Name" variant="outlined" color="primary" onChange={onChangeName} />
      <CustomDropdown name="employees" onChange={onChangeEmployee} options={{ type: employeesSelector }} value={employeeId} />
      <CustomDropdown name="companies" onChange={onChangeCompany} options={{ type: companiesSelector }} value={companyId} />
      <CustomDropdown name="departments" onChange={onChangeDepartment} options={{ type: departments }} value={departmentId} />
      <CustomButton type="submit" onClick={onClickSubmit} variant="contained" color="primary" endIcon={<SendIcon />} classes={{ root: styles.customButtonRoot }}>
        Submit
      </CustomButton>
    </FormControl>
  );
};

export default AddProjectPage;

const useStyles = makeStyles((theme) => ({
  formControlRoot: {
    "& > div": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  customButtonRoot: {
    padding: theme.spacing(1),
    fontSize: 12,

    "& svg": {
      fontSize: 10,
    },
  },
}));
