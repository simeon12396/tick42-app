import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { IEmployee } from "../../store/actions/employees/employeesActions";
import { IProject } from "../../store/actions/projects/projectsActions";
import { TRootState } from "../../store/reducers";

type TRouteParams = {
  id: string;
};

const EmployeeDetailsPage = () => {
  const styles = useStyles();
  const { id } = useParams<TRouteParams>();

  const [jobParticipates, setJobParticipates] = useState<string[] | []>([]);
  const employeesSelector = useSelector((state: TRootState) => state.employeesReducer.rawData);
  const projectSelector = useSelector((state: TRootState) => state.projectsReducer.rawData);

  const foundEmployee = employeesSelector && employeesSelector.find((p: IEmployee) => p.id === id);
  const foundEmployeeFullName = `${foundEmployee.firstName} ${foundEmployee.lastName}`;

  const findEmployeesCollaboration = () => {
    const employeesIds =
      projectSelector &&
      projectSelector.map((p: IProject) =>
        p.employeesId.map((id) => {
          if (id === foundEmployee.id) {
            return setJobParticipates((currState) => [...currState, p.name]);
          }
          return [];
        })
      );

    return employeesIds;
  };

  useEffect(() => {
    setJobParticipates([]);
    findEmployeesCollaboration();
  }, [id]);

  return (
    <div>
      <Typography variant="h5">Project details regarding to particular employee:</Typography>
      <div>
        <Typography variant="body1" className={styles.employeeLabel}>
          Name:
        </Typography>
        <Typography variant="body2">{foundEmployeeFullName}</Typography>
      </div>
      <div>
        <Typography variant="body1" className={styles.employeeLabel}>
          Date of birth:
        </Typography>
        <Typography variant="body2">{foundEmployee.dateOfBirth.slice(0, 10)}</Typography>
      </div>
      <div>
        <Typography variant="body1" className={styles.employeeLabel}>
          Job title:
        </Typography>
        <Typography variant="body2">{foundEmployee.jobTitle}</Typography>
      </div>
      <div>
        <Typography variant="body1" className={styles.employeeLabel}>
          Job Area:
        </Typography>
        <NavLink to={`/job-area/${foundEmployee.jobArea}`} className={styles.link}>
          <Typography variant="body2">{foundEmployee.jobArea}</Typography>
        </NavLink>
      </div>
      <div>
        <Typography variant="body1" className={styles.employeeLabel}>
          Job Type:
        </Typography>
        <Typography variant="body2">{foundEmployee.jobType}</Typography>
      </div>
      <div>
        <Typography variant="body1" className={styles.employeeLabel}>
          Job Participation:
        </Typography>
        {jobParticipates.length !== 0 ? (
          <Typography variant="body2">{jobParticipates.join()}</Typography>
        ) : (
          <Typography variant="body2">{`${foundEmployeeFullName} doesn't have any job participations!!`}</Typography>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;

const useStyles = makeStyles((theme) => ({
  employeeLabel: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
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
