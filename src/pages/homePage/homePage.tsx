import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCompanies } from "../../store/actions/companies/companiesActions";

const HomePage = (): JSX.Element => {
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  return <h1 className={styles.title}>home pagee bacee</h1>;
};

export default HomePage;

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
  },
}));
