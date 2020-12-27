import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCompanies } from "../../store/actions/companies/companiesActions";
import { fetchCompanyAddresses } from "../../store/actions/companyAddresses/companyAddressesActions";
import { fetchEmployees } from "../../store/actions/employees/employeesActions";
import { fetchProjects } from "../../store/actions/projects/projectsActions";

const HomePage = (): JSX.Element => {
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchEmployees());
    dispatch(fetchProjects());
    dispatch(fetchCompanyAddresses());
  }, []);

  return (
    <Typography variant="body1" className={styles.title}>
      Home Page
    </Typography>
  );
};

export default HomePage;

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
  },
}));
