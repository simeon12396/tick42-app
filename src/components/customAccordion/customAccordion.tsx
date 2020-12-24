import { Accordion, AccordionDetails, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { ICompany } from "../../store/actions/companies/companiesActions";
import { IEmployee } from "../../store/actions/employees/employeesActions";
import { TRootState } from "../../store/reducers";
import CustomAccordionSummary from "./customAccordionSummary";

const CustomAccordion = (): JSX.Element => {
  const styles = useStyles();
  const companiesSelector = useSelector((state: TRootState) => state.companiesReducer.rawData);
  //TODO Disregard these job areas, which are duplicated
  const employeesSelector = useSelector((state: TRootState) => state.employeesReducer.rawData);

  if (!companiesSelector || !employeesSelector) {
    return <h1>Loading....</h1>;
  }

  return (
    <Accordion classes={{ root: clsx(styles.accordionRoot, styles.generalAccordion) }}>
      <CustomAccordionSummary ariaControls="company-content" id="company-header" typoVariant="body2" typoTitle="Company Name" />

      <AccordionDetails classes={{ root: styles.accordionDetailsRoot }}>
        {companiesSelector.map((c: ICompany) => (
          <Typography variant="caption" classes={{ caption: styles.customCaption }} key={c.id}>
            {c.name}
          </Typography>
        ))}
        <Accordion classes={{ root: clsx(styles.accordionRoot, styles.generalAccordion) }}>
          <CustomAccordionSummary ariaControls="employee-job-content" id="employee-job-header" typoVariant="body2" typoTitle="Employee Job Area" />

          <AccordionDetails classes={{ root: styles.accordionDetailsRoot }}>
            {employeesSelector.map((e: IEmployee) => (
              <Typography variant="caption" classes={{ caption: styles.customCaption }} key={e.id}>
                {e.jobArea}
              </Typography>
            ))}

            <Accordion classes={{ root: clsx(styles.accordionRoot, styles.generalAccordion) }}>
              <CustomAccordionSummary ariaControls="employee-name-content" id="employee-name-header" typoVariant="body2" typoTitle="Employee Name" />

              <AccordionDetails classes={{ root: styles.accordionDetailsRoot }}>
                {employeesSelector.map((e: IEmployee) => (
                  <Typography variant="caption" classes={{ caption: styles.customCaption }} key={e.id}>
                    {`${e.firstName} ${e.lastName}`}
                  </Typography>
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
  },
  generalAccordion: {
    marginRight: theme.spacing(2),
  },
}));
