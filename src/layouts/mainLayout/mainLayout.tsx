import { ReactChild, ReactChildren } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomDrawerLeft from "../../components/customDrawer/customDrawer";

interface AuxProps {
  children: ReactChild | ReactChildren;
}

const MainLayout = ({ children }: AuxProps): JSX.Element => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <CustomDrawerLeft title="Welcome to tick42 app!" children={children} />
    </div>
  );
};

export default MainLayout;

const useStyles = makeStyles(() => ({
  container: {
    height: "100vh",
  },
}));
