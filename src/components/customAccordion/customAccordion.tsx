import { Accordion, AccordionDetails, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ICompany } from "../../store/actions/companies/companiesActions";
import { IEmployee } from "../../store/actions/employees/employeesActions";
import { TRootState } from "../../store/reducers";
import CustomAlert from "../common/customProgress/customProgress";
import CustomAccordionSummary from "./customAccordionSummary";

const CustomAccordion = (): JSX.Element => {
  const styles = useStyles();
  const companiesSelector = useSelector((state: TRootState) => state.companiesReducer.rawData);
  const employeesSelector = useSelector((state: TRootState) => state.employeesReducer.rawData);
  const jobAreas = employeesSelector && _.uniq(employeesSelector.map((e: IEmployee) => e.jobArea));

  if (!companiesSelector || !employeesSelector || !jobAreas) {
    return <CustomAlert />;
  }

  return (
    <Accordion classes={{ root: clsx(styles.accordionRoot, styles.generalAccordion) }}>
      <CustomAccordionSummary ariaControls="company-content" id="company-header" typoVariant="body2" typoTitle="Company Name" />

      <AccordionDetails classes={{ root: styles.accordionDetailsRoot }}>
        {companiesSelector.map((c: ICompany) => (
          <NavLink className={styles.customCaption} key={c.id} to={`/company/${c.id}`}>
            {c.name}
          </NavLink>
        ))}
        <Accordion classes={{ root: clsx(styles.accordionRoot, styles.generalAccordion) }}>
          <CustomAccordionSummary ariaControls="employee-job-content" id="employee-job-header" typoVariant="body2" typoTitle="Employee Job Area" />

          <AccordionDetails classes={{ root: styles.accordionDetailsRoot }}>
            {jobAreas.map((j: string) => (
              <NavLink className={styles.customCaption} key={j} to={`/job-area/${j}`}>
                {j}
              </NavLink>
            ))}

            <Accordion classes={{ root: clsx(styles.accordionRoot, styles.generalAccordion) }}>
              <CustomAccordionSummary ariaControls="employee-name-content" id="employee-name-header" typoVariant="body2" typoTitle="Employee Name" />

              <AccordionDetails classes={{ root: styles.accordionDetailsRoot }}>
                {employeesSelector.map((e: IEmployee) => (
                  <NavLink className={styles.customCaption} key={e.id} to={`/employee/${e.id}`}>
                    {`${e.firstName} ${e.lastName}`}
                  </NavLink>
                ))}
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;

const useStyles = makeStyles((theme) => ({
  accordionDetailsRoot: {
    display: "block",
    padding: `0px 0px 0px ${theme.spacing(2)}px`,
  },
  accordionRoot: {
    boxShadow: "none",
    margin: 0,

    "& .Mui-expanded": {
      marginRight: 0,
    },

    "&::before": {
      height: "0px",
    },
  },
  customCaption: {
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
  generalAccordion: {
    marginRight: theme.spacing(2),
  },
}));
