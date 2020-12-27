import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IEmployee } from "../../store/actions/employees/employeesActions";
import { IProject } from "../../store/actions/projects/projectsActions";
import { TRootState } from "../../store/reducers";

type TRouteParams = {
  jobAreaName: string;
};

const JobAreaDetailsPage = () => {
  const styles = useStyles();
  const { jobAreaName } = useParams<TRouteParams>();

  const [employeeCollaborationCounter, setEmployeeCollaborationCounter] = useState<number>(0);
  const employeesSelector = useSelector((state: TRootState) => state.employeesReducer.rawData);
  const workingEmployees = employeesSelector && employeesSelector.filter((p: IEmployee) => p.jobArea === jobAreaName);
  const projectsSelector = useSelector((state: TRootState) => state.projectsReducer.rawData);

  const findEmployeesCollaboration = () => {
    const employeesIds =
      projectsSelector &&
      projectsSelector.map((project: IProject) =>
        project.employeesId.map((id) =>
          workingEmployees.find((workingEmployee: IEmployee) => {
            if (workingEmployee.id === id) {
              setEmployeeCollaborationCounter((currentState) => currentState + 1);
            }
            return workingEmployee.id === id;
          })
        )
      );

    return employeesIds;
  };

  useEffect(() => {
    setEmployeeCollaborationCounter(0);
    findEmployeesCollaboration();
  }, [jobAreaName]);

  return (
    <div>
      <Typography variant="h5">Job area details: {jobAreaName}</Typography>
      <div className={styles.flexbox}>
        <Typography variant="body1" className={styles.jobAreaLabel}>
          The number of employees which are working in that area:
        </Typography>
        <Typography variant="body2">{workingEmployees.length}</Typography>
      </div>
      <div className={styles.flexbox}>
        <Typography variant="body1" className={styles.jobAreaLabel}>
          The number of employees with have a collaboration in the other projects:
        </Typography>
        <Typography variant="body2">{employeeCollaborationCounter}</Typography>
      </div>
    </div>
  );
};

export default JobAreaDetailsPage;

const useStyles = makeStyles((theme) => ({
  flexbox: {
    display: "flex",
    alignItems: "center",
  },
  jobAreaLabel: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}));
