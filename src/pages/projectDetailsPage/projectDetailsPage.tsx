import { Typography } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import CustomDropdown from "../../components/customDropdown/customDropdown";
import { IEmployee } from "../../store/actions/employees/employeesActions";
import { assignNewEmployee, IProject, updateProjectEmployees, updateProjectname } from "../../store/actions/projects/projectsActions";
import { TRootState } from "../../store/reducers";
import CancelIcon from "@material-ui/icons/Cancel";

type TRouteParams = {
  id: string;
};

const ProjectDetailsPage = () => {
  const { id } = useParams<TRouteParams>();

  const projectsSelector = useSelector((state: TRootState) => state.projectsReducer.rawData);
  const employeesSelector = useSelector((state: TRootState) => state.employeesReducer.rawData);
  const foundProjectDetails = projectsSelector && projectsSelector.find((p: IProject) => p.id === id);
  const matchedEmployees =
    foundProjectDetails.employeesId.length !== 0 && foundProjectDetails.employeesId.map((foundEmployee: string) => employeesSelector.find((e: IEmployee) => e.id === foundEmployee));
  const [projectName, setProjectName] = useState<string>(foundProjectDetails.name);
  const [newEmployeeId, setNewEmployeeId] = useState<string>(employeesSelector[0].id);
  const dispatch = useDispatch();

  const onChangeProjectName = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setProjectName(e.target.value);
  const onClickName = (e: any) => {
    e.preventDefault();
    dispatch(updateProjectname({ id, name: projectName }));
  };
  const removeEmployee = (id: string) => {
    const updatedProjectEmployees = foundProjectDetails.employeesId.filter((foundEmployee: string) => id !== foundEmployee);
    dispatch(updateProjectEmployees({ employeesId: updatedProjectEmployees, projectId: foundProjectDetails.id }));
  };
  const onChangeNewEmployee = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setNewEmployeeId(e.target.value);
  const onClickNewEmployee = (e: any) => {
    e.preventDefault();
    const employeesId = foundProjectDetails.employeesId.find((employeeId: string) => employeeId === newEmployeeId);

    if (!employeesId) {
      dispatch(assignNewEmployee({ projectId: foundProjectDetails.id, newEmployeeId }));
    }
  };

  return (
    <div>
      <Typography variant="h5">Project details about the project:</Typography>
      <form>
        <div>
          <Typography variant="body1">Name:</Typography>
          <input type="text" value={projectName} onChange={onChangeProjectName} />
        </div>

        <button type="submit" onClick={onClickName}>
          Submit
        </button>
      </form>
      <div>
        <Typography variant="body1">Department:</Typography>
        <Typography variant="body2">{foundProjectDetails.department}</Typography>
      </div>
      <form>
        <div>
          <Typography variant="body1">Assign new employee:</Typography>
          <CustomDropdown name="employee" onChange={onChangeNewEmployee} options={employeesSelector} defaultValue={newEmployeeId} />
        </div>

        <button type="submit" onClick={onClickNewEmployee}>
          Submit
        </button>
      </form>
      <div>
        <Typography variant="body1">Employees:</Typography>

        {matchedEmployees ? (
          matchedEmployees.map((projectEmployee: IEmployee) => (
            <div key={projectEmployee.id}>
              <Typography variant="body1">Name:</Typography>
              <NavLink to={`/employee/${projectEmployee.id}`}>{`${projectEmployee.firstName} ${projectEmployee.lastName}`}</NavLink>
              <CancelIcon onClick={() => removeEmployee(projectEmployee.id)} />
            </div>
          ))
        ) : (
          <Typography variant="body2">Attention! The company doesn't have any employees within this project!</Typography>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
