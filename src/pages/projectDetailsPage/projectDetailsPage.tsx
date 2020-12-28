import { TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import CustomDropdown from "../../components/customDropdown/customDropdown";
import { IEmployee } from "../../store/actions/employees/employeesActions";
import { assignNewEmployee, IProject, updateProjectEmployees, updateProjectname } from "../../store/actions/projects/projectsActions";
import { TRootState } from "../../store/reducers";
import CancelIcon from "@material-ui/icons/Cancel";
import CustomButton from "../../components/common/customButton/customButton";
import SendIcon from "@material-ui/icons/Send";
import clsx from "clsx";

type TRouteParams = {
  id: string;
};

const ProjectDetailsPage = () => {
  const styles = useStyles();
  const { id } = useParams<TRouteParams>();

  const projectsSelector = useSelector((state: TRootState) => state.projectsReducer.rawData);
  const employeesSelector = useSelector((state: TRootState) => state.employeesReducer.rawData);
  const foundProjectDetails = projectsSelector && projectsSelector.find((p: IProject) => p.id === id);
  const matchedEmployees =
    foundProjectDetails.employeesId.length !== 0 && foundProjectDetails.employeesId.map((foundEmployee: string) => employeesSelector.find((e: IEmployee) => e.id === foundEmployee));
  const [projectName, setProjectName] = useState<string>(foundProjectDetails.name);
  const [newEmployeeId, setNewEmployeeId] = useState<string>(employeesSelector[0].id);
  const dispatch = useDispatch();

  const onChangeProjectName = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => setProjectName(e.target.value as string);
  const onClickName = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateProjectname({ id, name: projectName }));
  };
  const removeEmployee = (id: string) => {
    const updatedProjectEmployees = foundProjectDetails.employeesId.filter((foundEmployee: string) => id !== foundEmployee);
    dispatch(updateProjectEmployees({ employeesId: updatedProjectEmployees, projectId: foundProjectDetails.id }));
  };
  const onChangeNewEmployee = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => setNewEmployeeId(e.target.value as string);
  const onClickNewEmployee = (e: FormEvent) => {
    e.preventDefault();
    const employeesId = foundProjectDetails.employeesId.find((employeeId: string) => employeeId === newEmployeeId);

    if (!employeesId) {
      dispatch(assignNewEmployee({ projectId: foundProjectDetails.id, newEmployeeId }));
    }
  };

  return (
    <div>
      <Typography variant="h5" className={styles.projectTitle}>
        Project details about the project:
      </Typography>
      <form className={styles.formContainer}>
        <div className={styles.entityContainer}>
          <Typography variant="body1" className={styles.projectLabel}>
            Name:
          </Typography>
          <TextField type="text" value={projectName} onChange={onChangeProjectName} />
        </div>

        <CustomButton type="submit" onClick={onClickName} variant="contained" color="primary" endIcon={<SendIcon />} classes={{ root: styles.customButtonRoot }}>
          Submit
        </CustomButton>
      </form>
      <div className={styles.entityContainer}>
        <Typography variant="body1" className={styles.projectLabel}>
          Department:
        </Typography>
        <Typography variant="body2">{foundProjectDetails.department}</Typography>
      </div>
      <form className={styles.formContainer}>
        <div className={styles.entityContainer}>
          <Typography variant="body1" className={styles.projectLabel}>
            Assign new employee:
          </Typography>
          <CustomDropdown name="employees" onChange={onChangeNewEmployee} options={{ type: employeesSelector }} value={newEmployeeId} />
        </div>

        <CustomButton type="submit" onClick={onClickNewEmployee} variant="contained" color="primary" endIcon={<SendIcon />} classes={{ root: styles.customButtonRoot }}>
          Submit
        </CustomButton>
      </form>
      <div className={styles.entityContainer}>
        <Typography variant="body1" className={clsx(styles.projectLabel, styles.entityContainer)}>
          Employees:
        </Typography>

        {matchedEmployees ? (
          matchedEmployees.map((projectEmployee: IEmployee) => (
            <div key={projectEmployee.id} className={styles.flexbox}>
              <NavLink to={`/employee/${projectEmployee.id}`} className={styles.link}>{`${projectEmployee.firstName} ${projectEmployee.lastName}`}</NavLink>
              <CancelIcon onClick={() => removeEmployee(projectEmployee.id)} className={styles.cancelIcon} />
            </div>
          ))
        ) : (
          <Typography variant="body2" color="error">
            Attention! The company doesn't have any employees within this project!
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;

const useStyles = makeStyles((theme) => ({
  flexbox: {
    display: "flex",
    alignItems: "center",
  },
  formContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  entityContainer: {
    display: "flex",
    alignItems: "flex-end",
    maxWidth: 500,
    flexWrap: "wrap",
  },
  customButtonRoot: {
    padding: "5px 10px",
    fontSize: 12,
    marginLeft: theme.spacing(2),

    "& svg": {
      fontSize: 10,
    },
  },
  nameLabel: {
    marginRight: theme.spacing(0.5),
    color: theme.palette.primary.main,
  },
  cancelIcon: {
    fill: theme.palette.error.main,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  projectLabel: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  projectTitle: {
    marginBottom: theme.spacing(1),
  },
  link: {
    display: "block",
    textDecoration: "none",
    color: theme.palette.primary.dark,
    opacity: 0.8,
    transition: "all linear .1s",

    "&:hover": {
      opacity: 1,
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
  },
}));
